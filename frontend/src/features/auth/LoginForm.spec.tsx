import { screen, act, waitFor, fireEvent } from "@testing-library/react";

import { renderWithClient } from "../../test-utils";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";
import { AUTH_LOGIN_ERROR } from "../../constants";
import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("LoginForm", () => {
  test.todo("USERNAMES SHOULD BE LOWERCASED");

  test("component visibility", () => {
    renderWithClient(<LoginForm />);

    expect(
      screen.getByPlaceholderText(/^Username or Email$/)
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/^Password$/)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /^show password$/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /^Login$/ })).toBeInTheDocument();
  });

  test("unmask password onclick", () => {
    renderWithClient(<LoginForm />);

    userEvent.click(screen.getByRole("button", { name: /^show password$/ }));
    expect(screen.getByPlaceholderText(/^Password$/)).toHaveAttribute(
      "type",
      "text"
    );
  });

  test("err on username,password required", async () => {
    renderWithClient(<LoginForm />);
    await act(async () =>
      userEvent.click(screen.getByRole("button", { name: /^Login$/ }))
    );
    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  test("err on username", async () => {
    renderWithClient(<LoginForm />);

    await act(async () => {
      userEvent.type(screen.getByPlaceholderText("Username or Email"), "asdf");
      userEvent.type(screen.getByPlaceholderText("Password"), "1234567890");

      userEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(async () => {
      expect(screen.getByText(AUTH_LOGIN_ERROR)).toBeInTheDocument();
    });
  });

  test("err on email", async () => {
    renderWithClient(<LoginForm />);

    await act(async () => {
      userEvent.type(
        screen.getByPlaceholderText("Username or Email"),
        "asdf@gmail.com"
      );
      userEvent.type(screen.getByPlaceholderText("Password"), "1234567890");

      userEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(async () => {
      expect(screen.getByText(AUTH_LOGIN_ERROR)).toBeInTheDocument();
    });
  });

  test("err on password by username", async () => {
    renderWithClient(<LoginForm />);

    await act(async () => {
      userEvent.type(
        screen.getByPlaceholderText("Username or Email"),
        "janedoe"
      );
      userEvent.type(screen.getByPlaceholderText("Password"), "123456789");

      userEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(async () => {
      expect(screen.getByText(AUTH_LOGIN_ERROR)).toBeInTheDocument();
    });
  });

  test("err on password by email", async () => {
    renderWithClient(<LoginForm />);

    await act(async () => {
      userEvent.type(
        screen.getByPlaceholderText("Username or Email"),
        "janedoe@gmail.com"
      );
      userEvent.type(screen.getByPlaceholderText("Password"), "123456789");

      userEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(async () => {
      expect(screen.getByText(AUTH_LOGIN_ERROR)).toBeInTheDocument();
    });
  });

  test("successful login by username", async () => {
    renderWithClient(<LoginForm />);

    await act(async () => {
      userEvent.type(
        screen.getByPlaceholderText("Username or Email"),
        "janedoe"
      );
      userEvent.type(screen.getByPlaceholderText("Password"), "1234567890");

      userEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(async () => {
      // getAllByText instead of getByText because chakra-ui returns multiple toast
      expect(screen.getAllByText(/^Welcome Jane Doe$/).length).not.toEqual(0);
    });
  });

  test("successful login by email", async () => {
    renderWithClient(<LoginForm />);

    await act(async () => {
      userEvent.type(
        screen.getByPlaceholderText("Username or Email"),
        "janedoe@gmail.com"
      );
      userEvent.type(screen.getByPlaceholderText("Password"), "1234567890");

      userEvent.click(screen.getByRole("button", { name: "Login" }));
    });

    await waitFor(async () => {
      // getAllByText instead of getByText because chakra-ui returns multiple toast
      expect(screen.getAllByText(/^Welcome Jane Doe$/).length).not.toEqual(0);
    });
  });
});
