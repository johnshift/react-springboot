import fakeLocalStorage from "./fakeLocalStorage";

describe("fakeLocalStorage", () => {
  test("getItem, setItem, removeItem", () => {
    const key = "test";
    const value = "test-value";
    fakeLocalStorage.setItem(key, value);

    const result = fakeLocalStorage.getItem(key);
    expect(result).toBe(value);

    fakeLocalStorage.removeItem(key);
    const newResult = fakeLocalStorage.getItem(key);
    expect(newResult).toBe(null);
  });

  test("clear", () => {
    const key = "test";
    const value = "test-value";
    fakeLocalStorage.setItem(key, value);

    fakeLocalStorage.clear();
    const result = fakeLocalStorage.getItem(key);
    expect(result).toBe(null);
  });
});
