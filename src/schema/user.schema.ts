import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export const requestOptSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default("/"),
});

export type requestOptInput = z.TypeOf<typeof requestOptSchema>;

export const verifyOptSchema = z.object({
  hash: z.string(),
});

export type verifyOptInput = z.TypeOf<typeof verifyOptSchema>;
