import { postHandlers } from "./posts";
import { reactionHandlers } from "./reactions";
import { authHandlers } from "./auth";
import { prettyUrlHandlers } from "./prettyURL";

export const handlers = [
  ...authHandlers,
  ...postHandlers,
  ...reactionHandlers,
  ...prettyUrlHandlers,
];
