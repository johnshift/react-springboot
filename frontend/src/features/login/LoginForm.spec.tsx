import renderW from "../../utils/test-utils/renderW";
import { screen, act, waitFor, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LOGIN_MSG_INCORRECT, LOGIN_MSG_OK } from "./constants";

import LoginForm from "./LoginForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BACKEND_API_URL, MSG_SOMETHING_WENT_WRONG } from "../../constants";

import { renderHook } from "@testing-library/react-hooks";
import store, { useAppSelector } from "../../store";
import { Provider, useSelector } from "react-redux";
import { selectToast } from "../toast/toastSlice";
import { ReactElement } from "react";
import Toast from "../toast";

describe("LoginForm", () => {
  let mockAxios: MockAdapter;
  let title: HTMLElement;
  let principalField: HTMLElement;
  let passwordField: HTMLElement;
  let togglePasswordBtn: HTMLElement;
  let signupLink: HTMLElement;
  let loginBtn: HTMLElement;

  const checkInvalidLoginState = (errmsg = LOGIN_MSG_INCORRECT) => {
    expect(principalField).toHaveAttribute("aria-invalid", "true");
    expect(passwordField).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(errmsg)).toBeInTheDocument();
  };

  // beforeEach(() => {
  //   renderW(
  //     <>
  //       <LoginForm />
  //       <Toast />
  //     </>
  //   );
  //   title = screen.getByText("veils");
  //   principalField = screen.getByLabelText(/^username or email$/i);
  //   passwordField = screen.getByLabelText(/^password$/i);
  //   togglePasswordBtn = screen.getByRole("button", {
  //     name: "toggle password visibility",
  //   });
  //   signupLink = screen.getByRole("link", {
  //     name: /create an account/i,
  //   });
  //   loginBtn = screen.getByRole("button", { name: /^login$/i });
  //   mockAxios = new MockAdapter(axios, { delayResponse: 1000 });
  // });

  // test("visibility", () => {
  //   // title
  //   expect(title).toBeInTheDocument();

  //   // username field
  //   expect(principalField).toBeInTheDocument();
  //   expect(principalField).toHaveAttribute("type", "text");

  //   // password field
  //   expect(passwordField).toBeInTheDocument();
  //   expect(passwordField).toHaveAttribute("type", "password");

  //   // show password btn
  //   expect(togglePasswordBtn).toBeInTheDocument();

  //   // signup link
  //   expect(signupLink).toBeInTheDocument();
  //   expect(signupLink).toHaveAttribute("href", "/signup");

  //   // login btn
  //   expect(loginBtn).toBeInTheDocument();
  // });

  // test("toggle password visibility", async () => {
  //   await act(async () => {
  //     userEvent.click(togglePasswordBtn);
  //   });
  //   expect(passwordField).toHaveAttribute("type", "text");
  // });

  // test("empty principal", async () => {
  //   await act(async () => {
  //     userEvent.type(passwordField, "123456");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("empty password", async () => {
  //   await act(async () => {
  //     userEvent.type(principalField, "demo");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("short principal", async () => {
  //   await act(async () => {
  //     userEvent.type(principalField, "dem");
  //     userEvent.type(passwordField, "demo123");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("short password", async () => {
  //   await act(async () => {
  //     userEvent.type(principalField, "demo");
  //     userEvent.type(passwordField, "demo12");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("long principal", async () => {
  //   await act(async () => {
  //     userEvent.type(
  //       principalField,
  //       "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
  //     );
  //     userEvent.type(passwordField, "demo123");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("long password", async () => {
  //   await act(async () => {
  //     userEvent.type(principalField, "demo");
  //     userEvent.type(
  //       passwordField,
  //       "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx"
  //     );
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("principal neat-uri", async () => {
  //   await act(async () => {
  //     userEvent.type(principalField, "demo!");
  //     userEvent.type(passwordField, "demo123");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  // test("principal invalid email", async () => {
  //   await act(async () => {
  //     userEvent.type(principalField, "demo@x.i");
  //     userEvent.type(passwordField, "demo123");
  //     userEvent.click(loginBtn);
  //   });

  //   await waitFor(async () => {
  //     checkInvalidLoginState();
  //   });
  // });

  test("backend network error", async () => {
    renderW(
      <>
        <LoginForm />
        <Toast />
      </>
    );

    const payload = {
      principal: "demo",
      password: "demo123",
    };

    principalField = screen.getByLabelText(/^username or email$/i);
    passwordField = screen.getByLabelText(/^password$/i);
    loginBtn = screen.getByRole("button", { name: /^login$/i });

    const mock = new MockAdapter(axios, { delayResponse: 1000 });
    mock.onPost(`${BACKEND_API_URL}/login`, payload).reply(200);
    mock.onPost(`${BACKEND_API_URL}/login`, payload).reply(200);
    mock.onPost(`${BACKEND_API_URL}/login`, payload).reply(200);

    await act(async () => {
      userEvent.type(principalField, "demo");
      userEvent.type(passwordField, "demo123");
      userEvent.click(loginBtn);
    });

    await waitFor(async () => {
      checkInvalidLoginState(MSG_SOMETHING_WENT_WRONG);
    });
  });
  test.todo("show loading when valid submit");
  test.todo("show loading longer than usual");
  test.todo("incorrect login");
  test.todo("successful login + token persist");
});
