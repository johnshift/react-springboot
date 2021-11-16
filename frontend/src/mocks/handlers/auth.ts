import { rest, DefaultRequestBody } from "msw";

import { db } from "../db";
import { LoginT, LoginError, LoginInput, UserT } from "../../types";
import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_URL,
  BACKEND_API_URL,
} from "../../constants";
import { getUserByUserVeilId } from "../user_veil";
import { SessionT } from "../../types/session";

import { v4 } from "uuid";
import { AUTH_LOGOUT_URL } from "../../constants";

export const authHandlers = [
  rest.post(AUTH_LOGOUT_URL, (req, res, ctx) => {
    const sessionId = req.cookies["x-session"];
    const csrfToken = req.headers.get("x-csrf-token");

    console.log("sessionId: ", sessionId);
    console.log("csrfToken: ", csrfToken);

    // if no csrfToken in req, reject req
    if (!csrfToken) {
      console.log("NO CSRFTOKEN IN REQ");
      return res(ctx.status(401, "Invalid csrf token"));
    }

    // check if session logged in
    const dbSession = db.session.findFirst({
      where: {
        id: {
          equals: sessionId,
        },
      },
    });
    if (!dbSession) {
      return res(ctx.status(401, "No currently active session"));
    }
    console.log("dbSession: ", dbSession);
    console.log("dbSession.csrfToken: ", dbSession.csrfToken);

    // authenticate csrf token
    if (dbSession && dbSession.csrfToken !== csrfToken) {
      console.log("UNEQUAL DB CSRF TOKEN");
      console.log("csrfToken: ", csrfToken);
      console.log("dbSession.csrfToken: ", dbSession.csrfToken);
      return res(ctx.status(401, "Invalid csrf token"));
    }

    // delete session from db
    db.session.delete({
      where: {
        id: {
          equals: sessionId,
        },
      },
    });

    return res(
      ctx.delay(1000),
      ctx.status(200, "Successfully logged out"),
      // expire the cookie
      ctx.cookie("x-session", "", {
        expires: new Date(new Date().getTime() - 60000),
      })
    );
  }),
  rest.post<DefaultRequestBody, SessionT | LoginError>(
    AUTH_LOGIN_URL,
    (req, res, ctx) => {
      // todo: check if already logged in
      // if already logged in, return credentials

      const { username, password } = req.body as LoginInput;

      // try looking for username-password match
      let dbCredential = db.credentials.findFirst({
        where: {
          username: {
            equals: username,
          },
          password: {
            equals: password,
          },
        },
      });

      // try looking for email-password match
      if (dbCredential === null) {
        dbCredential = db.credentials.findFirst({
          where: {
            email: {
              equals: username,
            },
            password: {
              equals: password,
            },
          },
        });

        // return error if unmatched
        if (dbCredential === null) {
          let response: LoginError = {
            message: AUTH_LOGIN_ERROR,
          };

          return res(ctx.json(response), ctx.status(401));
        }
      }

      const user: UserT = getUserByUserVeilId(dbCredential.userVeilId);

      // note: csrf is implemented in backend. only mocked here
      const response: SessionT = {
        id: v4(),
        userId: user.id,
        name: user.name,
        username: dbCredential.username,
        csrfToken: v4(),
      };

      // create session in db
      db.session.create(response);

      return res(
        ctx.status(200),
        ctx.json(response),
        // set response.id as session cookie w/ 30 minutes lifetime
        ctx.cookie("x-session", response.id, {
          expires: new Date(new Date().getTime() + 30 * 60000),
        })
      );
    }
  ),
];
