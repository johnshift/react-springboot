import { rest, DefaultRequestBody } from "msw";

import { db } from "../db";
import {
  LoginT,
  LoginError,
  LoginInput,
  UserT,
  JWTPayloadT,
} from "../../types";
import { AUTH_LOGIN_ERROR, BACKEND_API_URL } from "../../constants";
import { getUserByUserVeilId } from "../user_veil";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../jwt";

export const authHandlers = [
  rest.post<DefaultRequestBody, LoginT | LoginError>(
    BACKEND_API_URL + "/auth",
    (req, res, ctx) => {
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

      const response: LoginT = {
        id: user.id,
        name: user.name,
        username: dbCredential.username,
        email: dbCredential.email,
        desc: user.desc,
      };

      // todo: set jwt token
      // const token: JWTPayloadT = jwt.sign({
      //   userId: user.id,
      // }, JWT_SECRET);

      return res(ctx.status(200), ctx.json(response));
    }
  ),
];
