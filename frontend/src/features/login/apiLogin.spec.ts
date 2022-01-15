import apiLogin from "./apiLogin";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BACKEND_API_URL } from "../../constants";

describe("apiLogin", () => {
  const payload = {
    principal: "demo",
    password: "demo123",
  };

  // test("called thenFn", async () => {
  //   const mock = new MockAdapter(axios);
  //   mock.onPost(`${BACKEND_API_URL}/login`, payload).reply(200);

  //   const thenFn = jest.fn();
  //   const catchFn = jest.fn();

  //   await apiLogin({ thenFn, catchFn, payload });
  //   expect(thenFn).toHaveBeenCalledTimes(1);
  // });

  test("called catchFn", async () => {
    const mock = new MockAdapter(axios);
    mock.onPost(`${BACKEND_API_URL}/login`, payload).networkError();
    const thenFn = jest.fn();
    const catchFn = jest.fn(() => {
      console.log("fuck u");
    });
    await apiLogin({ thenFn, catchFn, payload });

    expect(catchFn).toHaveBeenCalledTimes(1);
  });
});
