/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen } from "@testing-library/react";
import Login from "../src/pages/login";
import renderW from "../src/test-utils/renderW";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
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

    // visible login as demo option
    // visible signup option
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

  test.todo("loading indicators");
  test.todo("login as demo option");
  test.todo("signup option");

  // error throws toast
  // error shows border on both input fields
  // success login shows toast
});
