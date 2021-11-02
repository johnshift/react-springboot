import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Ambot from "../src/components/Ambot";

describe("Ambot", () => {
  it("should render data.msg", async () => {
    render(<Ambot />);

    expect(screen.getByTestId("txt")).toHaveTextContent("Loading");

    await waitForElementToBeRemoved(() => screen.getByText("Loading"));

    expect(screen.getByTestId("txt")).toHaveTextContent("Hello World");
  });
});
