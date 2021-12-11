/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";

describe("Home", () => {
  it("works", () => {
    render(<Home />);

    const hello = screen.getByText("Hello NextJS");

    expect(hello).toBeInTheDocument();
  });
});
