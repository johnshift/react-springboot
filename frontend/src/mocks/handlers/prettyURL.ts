import { rest, DefaultRequestBody } from "msw";
import { BACKEND_API_URL } from "../../constants";
import { db } from "../db";

type PrettyURLT = {
  name: string;
  type: 0 | 1 | 2 | -1; // 0 = user, 1 = veil, 2 = page, -1 = not found
};

export const prettyUrlHandlers = [
  rest.get<DefaultRequestBody, PrettyURLT>(
    BACKEND_API_URL + "/pretty-url/:name",
    (req, res, ctx) => {
      const name = req.params.name;

      // match if username
      let dbCreds = db.credentials.findFirst({
        where: {
          username: {
            equals: name,
          },
        },
      });
      if (dbCreds !== null) {
        return res(ctx.status(200), ctx.json({ name, type: 0 }));
      }

      // match if veilname
      let dbVeil = db.user.findFirst({
        where: {
          name: {
            equals: name,
          },
          type: {
            equals: 1, // veil type
          },
        },
      });
      if (dbVeil !== null) {
        return res(ctx.status(200), ctx.json({ name, type: 1 }));
      }

      // match if groupname
      const dbGroup = db.group.findFirst({
        where: {
          name: {
            equals: name,
          },
        },
      });
      if (dbGroup !== null) {
        return res(ctx.status(200), ctx.json({ name, type: 2 }));
      }

      // default not found
      return res(ctx.status(200), ctx.json({ name, type: -1 }));
    }
  ),
];
