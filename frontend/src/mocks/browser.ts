import { setupWorker } from "msw";
import { handlers } from "./handlers";

// for local dev browser
export const worker = setupWorker(...handlers);
