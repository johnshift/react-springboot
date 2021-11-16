import { screen, act, waitFor, fireEvent } from "@testing-library/react";

import { renderWithClient } from "../../test-utils";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";
import {
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_URL,
  AUTH_LOGOUT_URL,
} from "../../constants";
import { server } from "../../mocks/server";
import axios from "axios";
import { SessionT } from "../../types";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Logout", () => {
  test.todo("check if cookies are destroyed");

  test("logout endpoint", async () => {
    const {
      data: { csrfToken },
    } = await axios.post<SessionT>(AUTH_LOGIN_URL, {
      username: "johnsmith",
      password: "asdfjkl;",
    });

    let status: number;
    let errRes = null;
    await axios
      .post(AUTH_LOGOUT_URL, "", {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      })
      .then((res) => {
        expect(res.status).toEqual(200);
      })
      .catch((err) => {
        expect(err).toEqual(null);
      });
  });
});

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

  test("successful login returns csrf token", async () => {
    const { data } = await axios.post<SessionT>(AUTH_LOGIN_URL, {
      username: "johnsmith",
      password: "asdfjkl;",
    });

    expect(data.csrfToken.length).not.toEqual(0);
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

// describe("Test login cookies", () => {
//   test("session id cookie saved after login", async () => {
//     const { data: loginData } = await axios.post<SessionT>(AUTH_LOGIN_URL, {
//       username: "johnsmith",
//       password: "asdfjkl;",
//     });

//     const { data } = await axios.get(BACKEND_API_URL + "/posts", {
//       headers: {
//         "X-CSRF-TOKEN": loginData.csrfToken,
//       },
//     });
//     console.log("data: ", data);

//     const { data: data1 } = await axios.get(BACKEND_API_URL + "/posts/1", {
//       headers: {
//         "X-CSRF-TOKEN": loginData.csrfToken,
//       },
//     });
//     console.log("data: ", data1);
//   });
// });
