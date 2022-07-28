import { createPostSchema, getPostSchema } from "../../schema/post.schema";
import { createRouter } from "../createRouter";
import * as tRpc from "@trpc/server";

export const postRouter = createRouter()
  .mutation("create", {
    input: createPostSchema,
    resolve: async ({ ctx, input }) => {
      if (!ctx.user)
        new tRpc.TRPCError({
          code: "FORBIDDEN",
          message: "Login to create a post.",
        });

      try {
        const post = await ctx.prisma.post.create({
          data: {
            ...input,
            user: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        });
        return post;
      } catch (e) {
        throw new tRpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong.",
        });
      }
    },
  })
  .query("posts", {
    resolve: async ({ ctx }) => {
      return ctx.prisma.post.findMany();
    },
  })
  .query("post", {
    input: getPostSchema,
    resolve: async ({ ctx, input }) => {
      return ctx.prisma.post.findFirst({
        where: {
          id: input.postId,
        },
      });
    },
  });
