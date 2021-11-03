import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";

import { setupServer } from "msw/node";
import { rest, DefaultRequestBody } from "msw";
import { LoginResponse, LoginError, LoginInput } from "../../types/auth";

const server = setupServer(
  rest.post<DefaultRequestBody, LoginResponse | LoginError>(
    "/auth",
    (req, res, ctx) => {
      if ((req.body as LoginInput).username !== "jsmith") {
        const err: LoginError = {
          field: "username",
          message: "Username does not exist",
        };
        return res(ctx.status(401), ctx.json(err));
      }

      if ((req.body as LoginInput).password !== "pass1") {
        const err: LoginError = {
          field: "password",
          message: "Incorrect password",
        };
        return res(ctx.status(401), ctx.json(err));
      }

      const data: LoginResponse = { name: "John Smith" };
      return res(ctx.json(data));
    }
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("LoginForm", () => {
  test("visible username input", () => {
    render(<LoginForm />);

    expect(
      screen.getByPlaceholderText(/^Username or Email$/)
    ).toBeInTheDocument();
  });

  test("visible password input", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(/^Password$/)).toBeInTheDocument();
  });

  test("visible show password button", () => {
    render(<LoginForm />);

    expect(
      screen.getByRole("button", { name: /^show password$/i })
    ).toBeInTheDocument();
  });

  test("visible login button", () => {
    render(<LoginForm />);

    expect(screen.getByRole("button", { name: /^Login$/ })).toBeInTheDocument();
  });

  test("unmask password onclick", () => {
    render(<LoginForm />);

    userEvent.click(screen.getByRole("button", { name: /^show password$/ }));
    expect(screen.getByPlaceholderText(/^Password$/)).toHaveAttribute(
      "type",
      "text"
    );
  });

  test("err: username/password required", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("err: username does not exist", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.type(screen.getByPlaceholderText("Username or Email"), "asdf");
    userEvent.type(screen.getByPlaceholderText("Password"), "xzcv");
    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText(/^Username does not exist$/)).toBeInTheDocument();
    });
  });

  test("err: incorrect password", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.type(screen.getByPlaceholderText("Username or Email"), "jsmith");
    userEvent.type(screen.getByPlaceholderText("Password"), "xzcv");
    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText(/^Incorrect password$/)).toBeInTheDocument();
    });
  });

  test("successful login", async () => {
    await act(async () => render(<LoginForm />));

    userEvent.type(screen.getByPlaceholderText("Username or Email"), "jsmith");
    userEvent.type(screen.getByPlaceholderText("Password"), "pass1");
    userEvent.click(screen.getByRole("button", { name: /^Login$/ }));
    await waitFor(() => {
      expect(screen.getByText(/^Welcome John Smith$/)).toBeInTheDocument();
    });
  });
});
