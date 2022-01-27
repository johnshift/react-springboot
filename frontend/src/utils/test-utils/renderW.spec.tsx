import { screen } from "@testing-library/react";
import renderW from "./renderW";

describe("renderW", () => {
  test("renderW render", () => {
    const testId = "el-p";
    const el = <p data-testid={testId}></p>;
    renderW(el);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  test("renderW rerender", () => {
    const testId = "el-p";
    const el = <p data-testid={testId}></p>;

    const { rerender } = renderW(<p>something</p>);
    rerender(el);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
