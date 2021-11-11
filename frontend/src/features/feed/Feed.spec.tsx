import { screen, waitFor } from "@testing-library/react";

import { renderWithClient } from "../../test-utils";
import { server } from "../../mocks/server";

import Feed from ".";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Feed", () => {
  test.todo("shows nothing to show if zero posts retrieved");
  test.todo("shows error on post fetch error");

  // it("renders all post", async () => {
  //   renderWithClient(<Feed />);

  //   await waitFor(() => {
  //     expect(screen.getByText(mockedPosts[0].created)).toBeInTheDocument();
  //     screen.debug();
  //   });
  // });
});
