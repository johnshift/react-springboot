/**
 * @jest-environment jsdom
 */

import React from "react";
import { screen } from "@testing-library/react";
import Home from "../src/pages/index";
import renderW from "../src/test-utils/renderW";

describe("Home", () => {
  it("works", () => {
    renderW(<Home />);

    const hello = screen.getByText("Hello NextJS");

    expect(hello).toBeInTheDocument();
  });
});
