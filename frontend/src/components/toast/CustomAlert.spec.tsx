import { render, screen } from "@testing-library/react";
import CustomAlert from "./CustomAlert";

describe("CustomAlert", () => {
  test("error", () => {
    render(<CustomAlert severity="error" />);

    const muiAlert = screen.getByRole("alert");
    const icon = screen.getByTestId("ErrorIcon");
    expect(muiAlert).toBeInTheDocument();
    expect(muiAlert).toHaveStyle({ animation: "0.6s shake" });
    expect(icon).toBeInTheDocument();
  });
  test("warning", () => {
    render(<CustomAlert severity="warning" />);
    const muiAlert = screen.getByRole("alert");
    const icon = screen.getByTestId("CachedIcon");

    expect(muiAlert).toBeInTheDocument();
    expect(muiAlert).toHaveStyle({
      animation: "1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite pulse",
    });
    expect(icon).toBeInTheDocument();
  });
});
