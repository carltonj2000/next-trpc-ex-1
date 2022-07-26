import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as tRpc from "@trpc/server";
import {
  createUserSchema,
  requestOptSchema,
  verifyOptSchema,
} from "../../schema/user.schema";
import { sendLoginEmail } from "../../utils/mailer";
import { createRouter } from "../createRouter";
import { baseUrl, url } from "../../constants";
import { encode, decode } from "../../utils/base64";
import { signJwt } from "../../utils/jwt";
import { serialize } from "cookie";

export const userRouter = createRouter()
  .mutation("register-user", {
    input: createUserSchema,
    resolve: async ({ ctx, input }) => {
      const { email, name } = input;
      try {
        const user = await ctx.prisma.user.create({
          data: {
            email,
            name,
          },
        });
        return user;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new tRpc.TRPCError({
              code: "CONFLICT",
              message: "User already exists",
            });
          }
        }

        throw new tRpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    },
  })
  .query("hello", { resolve: () => "hi" })
  .mutation("request-otp", {
    input: requestOptSchema,
    resolve: async ({ ctx, input }) => {
      const { email, redirect } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new tRpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await sendLoginEmail({
        token: encode(`${token.id}:${user.email}`),
        url: baseUrl,
        email: user.email,
      });

      return true;
    },
  })
  .query("verify-otp", {
    input: verifyOptSchema,
    resolve: async ({ ctx, input: { hash } }) => {
      const [id, email] = decode(hash).split(":");

      const token = await ctx.prisma.loginToken.findFirst({
        where: {
          id,
          user: {
            email,
          },
        },
        include: {
          user: true,
        },
      });

      if (!token) return {};
      // note that the throw below causes time consuming retries on the client
      // the check above save time to failure
      if (!token) {
        throw new tRpc.TRPCError({
          code: "FORBIDDEN",
          message: "Invalid token",
        });
      }

      const jwt = signJwt({ email: token.user.email, id: token.user.id });

      ctx.res.setHeader(
        "Set-Cookie",
        serialize("token", jwt, { path: "/", httpOnly: true })
      );
      return { redirect: token.redirect };
    },
  })
  .query("me", {
    resolve: ({ ctx }) => {
      return ctx.user;
    },
  });
