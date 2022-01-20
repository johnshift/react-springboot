import { rest } from "msw";
import { setupServer } from "msw/node";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";
import fakeLocalStorage from "../../utils/test-utils/fakeLocalStorage";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "./constants";
import { Payload } from "./types";
import apiLogin from "./apiLogin";

const server = setupServer(
  rest.post(`${BACKEND_API_URL}/login`, (req, res, ctx) => {
    const { principal, password } = req.body as Payload;

    if (principal === "networkError") {
      return res.networkError("Network Error");
    } else if (principal === "demo" && password === "demo123") {
      return res(
        ctx.status(200),
        ctx.set("authorization", "test-authorization")
      );
    } else {
      return res(ctx.status(400), ctx.json({ message: LOGIN_MSG_INCORRECT }));
    }
  })
);

beforeAll(() => {
  server.listen();
  Object.defineProperty(window, "localStorage", {
    value: fakeLocalStorage,
  });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe("apiLogin", () => {
  test("login successful", async () => {
    const [success, msg] = await apiLogin({
      principal: "demo",
      password: "demo123",
    });

    expect(success).toBe(true);
    expect(msg).toBe(LOGIN_MSG_OK);
  });
  test("login incorrect", async () => {
    const [success, msg] = await apiLogin({
      principal: "demox",
      password: "demo123",
    });

    expect(success).toBe(false);
    expect(msg).toBe(LOGIN_MSG_INCORRECT);
  });
  test("login networkError", async () => {
    const [success, msg] = await apiLogin({
      principal: "networkError",
      password: "demo123",
    });

    expect(success).toBe(false);
    expect(msg).toBe(MSG_SOMETHING_WENT_WRONG);
  });
});
