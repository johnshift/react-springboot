import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePost from "./CreatePost";
import { emojis } from "../../common/components/EmojiSelection";
import useStore from "../../store";

import { renderHook, act as hookAct } from "@testing-library/react-hooks";
import { Store } from "../../types";

describe("CreatePost", () => {
  test("visible profile avatar", () => {
    render(<CreatePost />);

    expect(
      screen.getByRole("link", { name: "user avatar" })
    ).toBeInTheDocument();
  });

  test("visible post body input", () => {
    render(<CreatePost />);

    expect(
      screen.getByPlaceholderText(/^Share your secrets anonymously$/)
    ).toBeInTheDocument();
  });

  test("visible emoji icon", () => {
    render(<CreatePost />);

    expect(
      screen.getByRole("button", { name: "select emoji" })
    ).toBeInTheDocument();
  });

  test("visible mention icon", () => {
    render(<CreatePost />);

    expect(
      screen.getByRole("button", { name: "mention someone" })
    ).toBeInTheDocument();
  });

  test("visible schedule icon", () => {
    render(<CreatePost />);

    expect(
      screen.getByRole("button", { name: "schedule post" })
    ).toBeInTheDocument();
  });

  test("visible post button", () => {
    render(<CreatePost />);

    expect(screen.getByRole("button", { name: "Post" })).toBeInTheDocument();
  });

  test("visible postAs icon", () => {
    render(<CreatePost />);

    expect(screen.getByRole("button", { name: "post as" })).toBeInTheDocument();
  });

  test("onclick emoji displays all emojis", () => {
    const { getAllByTestId } = render(<CreatePost />);

    userEvent.click(screen.getByRole("button", { name: "select emoji" }));
    expect(screen.getByText(/^Select Emoji$/)).toBeInTheDocument();

    const allRenderedEmojis = getAllByTestId("emoji-selection").map(
      (el) => el.textContent
    );
    const allEmojis = emojis.map((emoji) => emoji.symbol);
    expect(allRenderedEmojis).toEqual(allEmojis);
  });

  test("selecting emoji adds to post body", () => {
    render(<CreatePost />);

    const body = "asldfjlsadjfl";

    userEvent.type(screen.getByRole("textbox", { name: "post body" }), body);

    userEvent.click(screen.getByRole("button", { name: "select emoji" }));

    userEvent.click(
      screen.getByRole("button", { name: "slightly smiling face" })
    );

    expect(screen.getByRole("textbox", { name: "post body" })).toHaveValue(
      body + " " + emojis[0].symbol + " "
    );
  });

  test("appending emoji inbetween works correctly", async () => {
    render(<CreatePost />);

    // type random string
    const body = "1234567890";
    userEvent.type(screen.getByRole("textbox", { name: "post body" }), body);

    // move cursor to left 5 times
    for (let i = 0; i < 5; i++) {
      userEvent.type(
        screen.getByRole("textbox", { name: "post body" }),
        "{arrowleft}"
      );
    }

    userEvent.click(screen.getByRole("button", { name: "select emoji" }));

    userEvent.click(
      screen.getByRole("button", { name: "slightly smiling face" })
    );

    expect(screen.getByRole("textbox", { name: "post body" })).toHaveValue(
      "12345 " + emojis[0].symbol + " 67890"
    );
  });

  test("post as button works", () => {
    // mocks
    const x = renderHook<null, Store>(() => useStore());
    const { setAuthName } = x.result.current;
    const name = "Jane Doe";
    hookAct(() => {
      setAuthName(name);
    });

    render(<CreatePost />);

    const postAsButton = screen.getByRole("button", { name: "post as" });

    userEvent.click(postAsButton);
    expect(screen.getByText("Posting as your Veil")).toBeInTheDocument();

    userEvent.click(postAsButton);
    expect(screen.getByText("Posting as " + name)).toBeInTheDocument();
  });

  test("empty post body displays error", async () => {
    render(<CreatePost />);

    // userEvent.click(screen.getByRole("button", { name: "Post" }));
    await act(async () =>
      userEvent.click(screen.getByRole("button", { name: "Post" }))
    );

    expect(screen.getByText("Post cannot be empty")).toBeInTheDocument();

    // should clear error on type
    await act(async () =>
      userEvent.type(screen.getByRole("textbox", { name: "post body" }), "asdf")
    );
    expect(screen.queryByText("Post cannot be empty")).not.toBeInTheDocument();
  });

  // test.todo("onclick post button as veil prompts password");

  // test.todo("onclick post button prompts confirmation");

  // test.todo("post as user success");
  // test.todo("post as veil success");

  // test.todo("onclick mention icon displays people");
  // test.todo("onclick schedule icon displays date picker");
});
