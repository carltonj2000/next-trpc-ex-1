import { createRouter } from "../createRouter";

export const appRouter = createRouter().query("hello", {
  resolve: () => {
    return "hi from trpc server";
  },
});

export type AppRouter = typeof appRouter;
