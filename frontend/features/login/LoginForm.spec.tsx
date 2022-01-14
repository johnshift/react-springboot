import { render, screen } from "@testing-library/react";

import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("visibility", () => {
    render(<LoginForm />);

    // title
    const title = screen.getByText("veils");
    expect(title).toBeInTheDocument();

    // username field
    const usernameField = screen.getByLabelText(/^username or email$/i);
    expect(usernameField).toBeInTheDocument();

    // password field
    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toBeInTheDocument();

    // show password btn
    const showPassword = screen.getByRole("button", {
      name: "toggle password visibility",
    });
    expect(showPassword).toBeInTheDocument();

    // register link
    const registerLink = screen.getByRole("link", {
      name: /create an account/i,
    });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/signup");

    // login btn
    const loginBtn = screen.getByRole("button", { name: /login$/i });
    expect(loginBtn).toBeInTheDocument();
  });

  //   test.todo("show password");
  //   test.todo("escape/enter submits");
  //   test.todo("empty principal");
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
