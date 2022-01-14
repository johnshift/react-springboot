import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MSG_INCORRECT_LOGIN } from "./constants";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  let title: HTMLElement;
  let usernameField: HTMLElement;
  let passwordField: HTMLElement;
  let togglePasswordBtn: HTMLElement;
  let signupLink: HTMLElement;
  let loginBtn: HTMLElement;

  beforeEach(() => {
    render(<LoginForm />);
    title = screen.getByText("veils");
    usernameField = screen.getByLabelText(/^username or email$/i);
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
    expect(usernameField).toBeInTheDocument();
    expect(usernameField).toHaveAttribute("type", "text");

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
    await act(async () => {
      userEvent.type(passwordField, "123456");
      userEvent.click(loginBtn);
    });

    await waitFor(async () => {
      expect(screen.getByText(MSG_INCORRECT_LOGIN)).toBeInTheDocument();
    });
  });

  //   test.todo("empty password");
  //   test.todo("short principal");
  //   test.todo("short password");
  //   test.todo("long principal");
  //   test.todo("long password");
  //   test.todo("principal neat-uri");
  //   test.todo("principal invalid email");
  //   test.todo("backend network error");
  //   test.todo("show loading when valid submit");
  //   test.todo("show loading longer than usual");
  //   test.todo("incorrect login");
  //   test.todo("successful login + token persist");
});
