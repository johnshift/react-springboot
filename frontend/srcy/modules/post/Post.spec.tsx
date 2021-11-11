import { render, screen, act } from "@testing-library/react";
import { mockedPosts } from "../__mocks__/posts";
import Post from "./Post";
import userEvent from "@testing-library/user-event";

import { act as aact } from "react-dom/test-utils";

import useStore from "../../store";
import { renderHook } from "@testing-library/react-hooks";
import { Store } from "../../types";

describe("Post", () => {
  // test("visible avatar", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(
  //     screen.getByRole("link", { name: "post avatar" })
  //   ).toBeInTheDocument();
  // });

  // test("visible name", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(screen.getByText(post.owner)).toBeInTheDocument();
  // });

  // test("visible date", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(screen.getByText(post.created)).toBeInTheDocument();
  // });

  // test("visible body", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   const bodyParts = post.body.split("\n");
  //   const renderedBodyParts = screen
  //     .getAllByTestId("post-body-part")
  //     .map((el) => el.textContent);

  //   expect(bodyParts).toEqual(renderedBodyParts);
  // });

  // test("visible vote count", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(
  //     screen.getByRole("button", { name: "show votes" })
  //   ).toHaveTextContent(post.vote_count.toString());
  // });

  // test("visible upvote button", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(screen.getByRole("button", { name: "upvote" })).toBeInTheDocument();
  // });

  // test("visible downvote button", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(
  //     screen.getByRole("button", { name: "downvote" })
  //   ).toBeInTheDocument();
  // });

  // test("visible reactions list", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   for (let r of post.reactions) {
  //     expect(screen.getByText(r.reaction)).toBeInTheDocument();
  //   }
  // });

  // test("visible comments btn", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(
  //     screen.getByRole("button", { name: "show comments" })
  //   ).toBeInTheDocument();
  // });

  // test("visible react btn", () => {
  //   const post = mockedPosts[1];
  //   render(<Post {...post} />);

  //   expect(
  //     screen.getByRole("button", { name: "react to post" })
  //   ).toBeInTheDocument();
  // });

  test("upvote increase vote count", async () => {
    const post = mockedPosts[1];
    const expected = (post.vote_count + 1).toString();

    const { getByRole: x } = render(<Post {...post} />);

    console.log("post vote_count: ", post.vote_count);

    console.log(
      "vote textContent: ",
      screen.getByRole("button", { name: "show votes" }).textContent
    );

    console.log("expected: ", expected);

    const upvoteButton = screen.getByRole("button", { name: "downvote" });

    await aact(async () => {
      userEvent.click(upvoteButton);
    });

    expect(x("button", { name: "show votes" })).toHaveTextContent(expected);

    // expect(screen.getByText(expected)).toBeInTheDocument();

    // await act(async () => {
    //   expect(
    //     screen.getByRole("button", { name: "show votes" })
    //   ).toHaveTextContent(expected);
    // });
  });

  test.todo("downvote decrease vote count");

  test.todo("only one react per account");

  test.todo("click votes button display votes");
  test.todo("click comments button display comments");
  test.todo("click react button display emoji selection");
  test.todo("click raections displays reaction list");

  test.todo("click name routes to profile");
  test.todo("click name routes to veil");
  test.todo("click avatar routes to profile");
  test.todo("click avatar routes to veil");

  test.todo("reaction list 'others' count is correct");
  test.todo("comment count is correct");

  test.todo("after choosing reaction, added on the button");
  test.todo("after choosing reaciton, added on reaction list");

  test.todo("update vote debounced correctly");

  test.todo("only display top 3 reaction emojis");

  test.todo('owned reaction should display "You"');

  test.todo("add reaction as veil works correctly");
});
