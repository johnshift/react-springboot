import { screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";

import Post from ".";

import axios from "axios";
import { server } from "../../mocks/server";
import { renderWithClient } from "../../test-utils";

import { AUTH_LOGIN_URL, BACKEND_API_URL } from "../../constants";
import { listTopReactions } from "./PostInfo";
import { prettyReactions } from "../../../srcy/common/utils/prettyReactions";
import { QueryObserverBaseResult, useQuery, UseQueryResult } from "react-query";
import { wrapper } from "../../test-utils/renderWithClient";
import { PostT } from "../../types/post";
import { SessionT } from "../../types";
import { credentials } from "../../mocks/credentials";
import { useRecoilValue, useRecoilState } from "recoil";
import { sessionAtom } from "../../recoil/auth/atom";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Post", () => {
  // login as johnshift before each test
  beforeEach(async () => {
    const {
      data: { csrfToken },
    } = await axios.post<SessionT>(
      AUTH_LOGIN_URL,
      {
        username: "johnsmith",
        password: "asdfjkl;",
      }
      // { withCredentials: true }
    );

    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  });

  test("endpoint", async () => {
    const { data } = await axios.get(BACKEND_API_URL + "/posts/", {
      // headers: {
      //   "X-AMBOT": "FUCK YOU",
      // },
      // withCredentials: true,
    });
    // console.log("data: ", data);
  });

  // test("component visibility", async () => {
  //   const { data: post } = await axios.get(BACKEND_API_URL + "/posts/1");
  //   renderWithClient(<Post {...post} />);
  //   // visible profile avatar
  //   expect(
  //     screen.getByRole("link", { name: "post avatar" })
  //   ).toBeInTheDocument();
  //   // visibile name
  //   expect(screen.getByText(post.owner)).toBeInTheDocument();
  //   // visible date
  //   expect(screen.getByText(post.created)).toBeInTheDocument();
  //   // visible body separated by nextline
  //   const bodyParts = post.body.split("\n");
  //   const renderedBodyParts = screen
  //     .getAllByTestId("post-body-part")
  //     .map((el) => el.textContent);
  //   expect(bodyParts).toEqual(renderedBodyParts);
  //   // visible vote count
  //   expect(
  //     screen.getByRole("button", { name: "show votes" })
  //   ).toHaveTextContent(post.voteCount.toString());
  //   // visible upvote/downvote button
  //   expect(screen.getByRole("button", { name: "upvote" })).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("button", { name: "downvote" })
  //   ).toBeInTheDocument();
  //   // visible top3 emoji list
  //   const top3 = listTopReactions(post.reactions);
  //   for (let i = 0; i < top3.length; i++) {
  //     expect(
  //       screen.getByTestId("top-" + (i + 1) + "-reaction")
  //     ).toHaveTextContent(top3[i]);
  //   }
  //   // visible people who reacted info
  //   const reactionsInfo = prettyReactions(post.reactions);
  //   expect(screen.getByText(reactionsInfo)).toBeInTheDocument();
  //   // visible comments button
  //   expect(
  //     screen.getByRole("button", { name: "show comments" })
  //   ).toBeInTheDocument();
  //   // visible react button
  //   expect(
  //     screen.getByRole("button", { name: "react to post" })
  //   ).toBeInTheDocument();
  // });

  // test("reactions", async () => {
  //   const { data: post } = await axios.get(BACKEND_API_URL + "/posts/1");
  //   renderWithClient(<Post {...post} />);
  //   userEvent.click(screen.getByRole("button", { name: "react to post" }));
  //   userEvent.click(screen.getByRole("button", { name: "star-struck" }));
  // });

  // test("asdf", async () => {
  //   const useCustomHook = (id: number) => {
  //     return useQuery("posts/:id", async () => {
  //       const { data } = await axios.get(BACKEND_API_URL + "/posts/" + id);
  //       return data;
  //     });
  //   };
  //   const { result, waitFor } = renderHook(() => useCustomHook(1), { wrapper });
  //   await waitFor(() => result.current.isSuccess);
  //   console.log("result.current.data: ", result.current.data);
  // });

  test.todo('empty reaction list should display "Be the first to react"');
});
