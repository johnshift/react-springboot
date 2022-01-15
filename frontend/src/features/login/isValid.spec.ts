import isValid from "./isValid";

describe("isValid", () => {
  test("valid", () => {
    expect(isValid("demo", "demo123")).toBeTruthy();
  });
});
