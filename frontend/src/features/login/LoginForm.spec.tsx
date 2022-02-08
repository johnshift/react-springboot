import {
  screen,
  waitForElementToBeRemoved,
  waitFor,
  act,
} from "@testing-library/react";
import { renderHook, act as hookAct } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";
import fakeLocalStorage from "../../utils/test-utils/fakeLocalStorage";
import renderW, { AppWrapper } from "../../utils/test-utils/renderW";
import Toast from "../toast";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "../toast/constants";
import useToast from "../toast/useToast";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "./constants";

import LoginForm from "./LoginForm";
import { LoginPayload } from "./types";

const server = setupServer(
  rest.post(`${BACKEND_API_URL}/login`, (req, res, ctx) => {
    const { principal, password } = req.body as LoginPayload;

    if (principal === "networkError") {
      return res.networkError("Network Error");
    } else if (principal === "long") {
      return res(ctx.status(400), ctx.delay(2000));
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

describe("LoginForm", () => {
  test("component visibility", () => {
    const onClose = jest.fn();
    renderW(<LoginForm onClose={onClose} />);

    const title = screen.getByText("veils");
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const togglePasswordBtn = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    const registerLink = screen.getByRole("link", {
      name: /create an account/i,
    });
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

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

    // register link
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");

    // login btn
    expect(loginBtn).toBeInTheDocument();
  });

  test("toggle password visibility", async () => {
    const onClose = jest.fn();
    renderW(<LoginForm onClose={onClose} />);

    const passwordField = screen.getByLabelText(/^password$/i);
    const togglePasswordBtn = screen.getByRole("button", {
      name: "toggle password visibility",
    });

    expect(passwordField).toHaveAttribute("type", "password");

    await userEvent.click(togglePasswordBtn);

    expect(passwordField).toHaveAttribute("type", "text");
  });

  test("empty principal", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // only fill-in password then click login
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("empty password", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // only fill-in principal then click login
    await userEvent.type(principalField, "demo");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("short principal", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // short principal login
    await userEvent.type(principalField, "dem");
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("short password", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // short password login
    await userEvent.type(principalField, "demo");
    await userEvent.type(passwordField, "demo1");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("long principal", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // long principal login
    await userEvent.type(
      principalField,
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("long password", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // long password login
    await userEvent.type(principalField, "demo");
    await userEvent.type(
      passwordField,
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
    );
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("neat-uri principal", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // invalid neat-uri login
    await userEvent.type(principalField, "demo!");
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("invalid email", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // invalid email login
    await userEvent.type(principalField, "demo@x.i");
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // should not pass validation therefore, no loading skeleton
    expect(screen.queryByTestId("loginForm-skl")).toBeNull();

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("network error", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // networkError login (msw)
    await userEvent.type(principalField, "networkError");
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // loading indicator
    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(() =>
      screen.queryByText(TOAST_MSG_LOADING)
    );

    // check invalid state
    expect(principalField).toHaveAttribute("aria-invalid", "false");
    expect(passwordField).toHaveAttribute("aria-invalid", "false");
    expect(screen.getByText(MSG_SOMETHING_WENT_WRONG)).toBeInTheDocument();
  });

  test("incorrect login", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // incorrect login (msw)
    await userEvent.type(principalField, "demox");
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // loading indicator
    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(() =>
      screen.queryByText(TOAST_MSG_LOADING)
    );

    // check invalid state
    await waitFor(() => {
      expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
      expect(screen.getByLabelText(/^username or email$/i)).toHaveAttribute(
        "aria-invalid",
        "true"
      );
      expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
        "aria-invalid",
        "true"
      );
    });
  });

  test("successful login + token persist", async () => {
    const onClose = jest.fn();
    // render w/ toast
    renderW(
      <>
        <LoginForm onClose={onClose} />
        <Toast />
      </>
    );

    // elements present
    const principalField = screen.getByLabelText(/^username or email$/i);
    const passwordField = screen.getByLabelText(/^password$/i);
    const loginBtn = screen.getByRole("button", { name: /^login$/i });

    // successful login (msw)
    await userEvent.type(principalField, "demo");
    await userEvent.type(passwordField, "demo123");
    await userEvent.click(loginBtn);

    // loading indicator
    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(() =>
      screen.queryByText(TOAST_MSG_LOADING)
    );

    // check invalid state
    await waitFor(() => {
      expect(screen.getByText(LOGIN_MSG_OK)).toBeInTheDocument();
      expect(window.localStorage.getItem("authorization")).toBe(
        "test-authorization"
      );
    });
  });
});
