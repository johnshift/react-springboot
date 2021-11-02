import { render, screen, act, waitFor } from "@testing-library/react";
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

  it("should display simple validation *required* errors", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("username does not exist", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.type(screen.getByPlaceholderText("Username or Email"), "asdf");
    userEvent.type(screen.getByPlaceholderText("Password"), "xzcv");
    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText(/^Username does not exist$/)).toBeInTheDocument();
    });
  });

  test("incorrect password", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.type(screen.getByPlaceholderText("Username or Email"), "jsmith");
    userEvent.type(screen.getByPlaceholderText("Password"), "xzcv");
    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText(/^Incorrect password$/)).toBeInTheDocument();
    });
  });
});
