import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "../src/components/LoginForm";

describe("LoginForm", () => {
  it("should display username input", () => {
    render(<LoginForm />);

    expect(
      screen.getByPlaceholderText(/^Username or Email$/)
    ).toBeInTheDocument();
  });

  it("should display password input", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(/^Password$/)).toBeInTheDocument();
  });

  it("should display show password button", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: /^show password$/i })
    ).toBeInTheDocument();
  });

  it("should display login button", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /^Login$/ })).toBeInTheDocument();
  });

  it("should show password onclick", () => {
    render(<LoginForm />);

    userEvent.click(screen.getByRole("button", { name: /^show password$/ }));
    expect(screen.getByPlaceholderText(/^Password$/)).toHaveAttribute(
      "type",
      "text"
    );
  });
});
