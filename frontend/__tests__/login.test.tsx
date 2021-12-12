/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen, act, waitFor } from "@testing-library/react";
import Login from "../src/pages/login";
import renderW from "../src/test-utils/renderW";
import userEvent from "@testing-library/user-event";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AUTHORIZATION_KEY, MSG_LOGIN_SUCCESSFUL } from "../src/lib/constants";
import { fakeLocalStorage } from "../src/test-utils/fakeLocalStorage";

import { renderHook } from "@testing-library/react-hooks";
import { simulateDelay } from "../src/lib/simulateDelay";

describe("Login", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);

    // mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: fakeLocalStorage,
    });
  });

  const typeThenLogin = async () => {
    const usernameInput = screen.getByPlaceholderText(/username or email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByRole("button", { name: /login/i });

    userEvent.type(usernameInput, "asdf");
    userEvent.type(passwordInput, "1234");
    userEvent.click(loginBtn);
  };

  test("component visibility", () => {
    renderW(<Login />);

    // visible veils title
    const veilsTitle = screen.getByText("veils");
    expect(veilsTitle).toBeInTheDocument();

    // visible username field
    const usernameInput = screen.getByPlaceholderText("Username or Email");
    expect(usernameInput).toBeInTheDocument();

    // visible password field
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();

    // visible show password field
    const showPasswordBtn = screen.getByRole("button", {
      name: "show password",
    });
    expect(showPasswordBtn).toBeInTheDocument();

    // visible login button
    const loginBtn = screen.getByRole("button", {
      name: "Login",
    });
    expect(loginBtn).toBeInTheDocument();

    // visible login as demo
    const demoOption = screen.getByRole("button", { name: /demo/i });
    expect(demoOption).toBeInTheDocument();

    // visible signup option
    const signupOption = screen.getByText(/create an account/i);
    expect(signupOption).toBeInTheDocument();
  });

  test("show password button working", () => {
    renderW(<Login />);

    const showPasswordBtn = screen.getByRole("button", {
      name: "show password",
    });
    const passwordInput = screen.getByPlaceholderText("Password");

    userEvent.click(showPasswordBtn);
    expect(passwordInput).toHaveAttribute("type", "text");

    userEvent.click(showPasswordBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("loading indicators", async () => {
    renderW(<Login />);

    const responsePayload = {
      message: MSG_LOGIN_SUCCESSFUL,
    };
    mock.onPost("/api/login").reply(200, responsePayload);

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /login/i }));
    });

    await waitFor(async () => {
      expect(screen.getByTestId("skeleton-principal")).toBeInTheDocument();
      expect(screen.getByTestId("skeleton-password")).toBeInTheDocument();
    });
  });

  // error throws toast
  test("login errors visibility", async () => {
    renderW(<Login />);

    const usernameInput = screen.getByPlaceholderText(/username or email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    const responsePayload = {
      message: "Incorrect username/email or password",
    };
    mock.onPost("/api/login").reply(400, responsePayload);

    await act(typeThenLogin);

    await waitFor(async () => {
      expect(
        screen.getByText("Incorrect username/email or password")
      ).toBeInTheDocument();
      expect(usernameInput).toHaveStyle("border-color: #E53E3E)");
      expect(passwordInput).toHaveStyle("border-color: #E53E3E)");
    });
  });

  test.todo(" => conrirm redirection after successful login");
  test.todo(" => confirm redirection if already logged in");

  // login submit, error -> ok
  // w/ session, homepage, refresh 	->	ok
  // w/ session, login-page, refresh	-> redirect to home
  // w/o session, login-page, refresh -> ok
  // w/o session, homepage, refresh -> redirect to login
});
