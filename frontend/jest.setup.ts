import "@testing-library/jest-dom";

import "@testing-library/jest-dom/extend-expect";

import { setupServer } from "msw/node";
import { rest, DefaultRequestBody } from "msw";
import { LoginResponse, LoginError, LoginInput } from "./src/models/auth";

const server = setupServer(
  rest.get<DefaultRequestBody, { msg: string }>("/ambot", (req, res, ctx) => {
    return res(ctx.json({ msg: "Hello World" }));
  }),
  rest.post<DefaultRequestBody, LoginResponse | LoginError>(
    "/auth",
    (req, res, ctx) => {
      if ((req.body as LoginInput).username !== "jsmith") {
        const err: LoginError = {
          field: "username",
          message: "Username does not exist",
        };
        return res(ctx.status(401), ctx.json(err));
      }

      if ((req.body as LoginInput).password !== "pass1") {
        const err: LoginError = {
          field: "password",
          message: "Incorrect password",
        };
        return res(ctx.status(401), ctx.json(err));
      }

      const data: LoginResponse = { name: "John Smith" };
      return res(ctx.json(data));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
