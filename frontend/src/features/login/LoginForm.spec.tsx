import renderW, { AppWrapper } from "../../utils/test-utils/renderW";
import {
  screen,
  act,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "./constants";

import LoginForm, { LoginPayload } from "./LoginForm";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";

import Toast from "../toast";

import { rest } from "msw";
import { setupServer } from "msw/node";
import fakeLocalStorage from "../../utils/test-utils/fakeLocalStorage";

import { renderHook, act as hookAct } from "@testing-library/react-hooks/dom";
import { useAppDispatch } from "../../store";
import { setDelayParams } from "../toast/toastSlice";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "../toast/constants";

const server = setupServer(
  rest.post(`${BACKEND_API_URL}/login`, (req, res, ctx) => {
    const { principal, password } = req.body as LoginPayload;

    if (principal === "networkError") {
      return res.networkError("Network Error");
    } else if (principal === "long") {
      return res(ctx.status(400), ctx.delay(1000));
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
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginForm", () => {
  let title: HTMLElement;
  let principalField: HTMLElement;
  let passwordField: HTMLElement;
  let togglePasswordBtn: HTMLElement;
  let signupLink: HTMLElement;
  let loginBtn: HTMLElement;

  const checkInvalidLoginState = (errmsg = LOGIN_MSG_INCORRECT) => {
    if (errmsg !== MSG_SOMETHING_WENT_WRONG) {
      expect(principalField).toHaveAttribute("aria-invalid", "true");
      expect(passwordField).toHaveAttribute("aria-invalid", "true");
    }
    expect(screen.getByText(errmsg)).toBeInTheDocument();
  };

  beforeEach(() => {
    renderW(
      <>
        <LoginForm />
        <Toast />
      </>
    );
    title = screen.getByText("veils");
    principalField = screen.getByLabelText(/^username or email$/i);
    passwordField = screen.getByLabelText(/^password$/i);
    togglePasswordBtn = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    signupLink = screen.getByRole("link", {
      name: /create an account/i,
    });
    loginBtn = screen.getByRole("button", { name: /^login$/i });
  });

  test("visibility", () => {
    // title
    expect(title).toBeInTheDocument();

    // username field
    expect(principalField).toBeInTheDocument();
    expect(principalField).toHaveAttribute("type", "text");

    // password field
    expect(passwordField).toBeInTheDocument();
    expect(passwordField).toHaveAttribute("type", "password");

    // show password btn
    expect(togglePasswordBtn).toBeInTheDocument();

    // signup link
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/signup");

    // login btn
    expect(loginBtn).toBeInTheDocument();
  });

  test("toggle password visibility", async () => {
    await act(async () => {
      userEvent.click(togglePasswordBtn);
    });
    expect(passwordField).toHaveAttribute("type", "text");
  });

  test("empty principal", async () => {
    userEvent.type(passwordField, "123456");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("empty password", async () => {
    userEvent.type(principalField, "demo");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("short principal", async () => {
    userEvent.type(principalField, "dem");
    userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("short password", async () => {
    userEvent.type(principalField, "demo");
    userEvent.type(passwordField, "demo1");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("long principal", async () => {
    userEvent.type(
      principalField,
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );
    userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("long password", async () => {
    userEvent.type(principalField, "demo");
    userEvent.type(
      passwordField,
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("principal neat-uri", async () => {
    userEvent.type(principalField, "demo!");
    userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("principal invalid email", async () => {
    userEvent.type(principalField, "demo@x.i");
    userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    await waitFor(async () => {
      checkInvalidLoginState();
    });
  });

  test("backend network error", async () => {
    userEvent.type(principalField, "networkError");
    userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    // valid login should show skeleton
    await screen.findByTestId("loginForm-skl");

    await waitFor(async () => {
      checkInvalidLoginState(MSG_SOMETHING_WENT_WRONG);
    });
  });

  test("incorrect login", async () => {
    await userEvent.type(principalField, "demox");
    await userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LOADING));

    await screen.findByText(LOGIN_MSG_INCORRECT);
  });

  test("show loading longer than usual", async () => {
    const { result: appDispatchResult } = renderHook(() => useAppDispatch(), {
      wrapper: AppWrapper,
    });
    const dispatch = appDispatchResult.current;

    // adjust delay params to make tests short
    await hookAct(async () => {
      dispatch(
        setDelayParams({
          longDelay: 600,
          smthErrDelay: 800,
        })
      );
    });

    await userEvent.type(principalField, "long");
    await userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LOADING));
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LONGER));

    await screen.findByText(MSG_SOMETHING_WENT_WRONG);
  });

  test("successful login + token persist", async () => {
    await userEvent.type(principalField, "demo");
    await userEvent.type(passwordField, "demo123");
    userEvent.click(loginBtn);

    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LOADING));

    expect(screen.getByText(LOGIN_MSG_OK)).toBeInTheDocument();
    expect(window.localStorage.getItem("authorization")).toBe(
      "test-authorization"
    );
  });
});
