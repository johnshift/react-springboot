import { rest, DefaultRequestBody } from "msw";

import { db } from "../db";
import { ReactionT } from "../../types";
import { BACKEND_API_URL } from "../../constants";

export const reactionHandlers = [
  rest.post(BACKEND_API_URL + "/reactions", (req, res, ctx) => {
    console.log("req.body: ", req.body);

    res(ctx.status(200));
  }),
];
