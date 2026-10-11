import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { contentRouter } from "./routers/content";
import { languagesRouter } from "./routers/languages";
import { settingsRouter } from "./routers/settings";
import { partnersRouter } from "./routers/partners";
import { requestsRouter } from "./routers/requests";
import { usersRouter } from "./routers/users";
import { chatRouter } from "./routers/chat";
import { blocksRouter } from "./routers/blocks";
import { questionsRouter } from "./routers/questions";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  content: contentRouter,
  languages: languagesRouter,
  settings: settingsRouter,
  partners: partnersRouter,
  requests: requestsRouter,
  users: usersRouter,
  chat: chatRouter,
  blocks: blocksRouter,
  questions: questionsRouter,
});

export type AppRouter = typeof appRouter;
