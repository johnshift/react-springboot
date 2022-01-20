import { renderHook, act as hookAct } from "@testing-library/react-hooks";
import { FormEvent } from "react";
import useLoginForm from "./useLoginForm";

describe("useLoginForm", () => {
  test("showPassword, togglePassword", () => {
    const { result } = renderHook(() => useLoginForm());
    const { showPassword, togglePassword } = result.current;

    expect(showPassword).toBe(false);
    hookAct(() => {
      togglePassword();
    });

    const { showPassword: newValue } = result.current;
    expect(newValue).toBe(true);
  });

  test("hasError, setHasError", () => {
    const { result } = renderHook(() => useLoginForm());
    const { hasError, setHasError } = result.current;

    expect(hasError).toBe(false);
    hookAct(() => {
      setHasError(true);
    });

    const { hasError: newValue } = result.current;
    expect(newValue).toBe(true);
  });

  test("loading, setLoading", () => {
    const { result } = renderHook(() => useLoginForm());
    const { loading, setLoading } = result.current;

    expect(loading).toBe(false);
    hookAct(() => {
      setLoading(true);
    });

    const { loading: newValue } = result.current;
    expect(newValue).toBe(true);
  });

  test("payload, onChangeHandler, principal", () => {
    const { result } = renderHook(() => useLoginForm());
    const { payload, onChangeHandler } = result.current;

    expect(payload).toStrictEqual({ principal: "", password: "" });

    const event = {
      currentTarget: { name: "principal", value: "demo" },
    } as FormEvent<HTMLInputElement>;
    hookAct(() => {
      onChangeHandler(event);
    });

    const { payload: newValue } = result.current;
    expect(newValue).toStrictEqual({ principal: "demo", password: "" });
  });

  test("payload, onChangeHandler, password", () => {
    const { result } = renderHook(() => useLoginForm());
    const { payload, onChangeHandler } = result.current;

    expect(payload).toStrictEqual({ principal: "", password: "" });

    const event = {
      currentTarget: { name: "password", value: "demo" },
    } as FormEvent<HTMLInputElement>;
    hookAct(() => {
      onChangeHandler(event);
    });

    const { payload: newValue } = result.current;
    expect(newValue).toStrictEqual({ password: "demo", principal: "" });
  });

  test("isValid empty principal", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "";
    const password = "demo123";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid empty password", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "demo";
    const password = "";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid short principal", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "dem";
    const password = "demo123";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid long principal", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal =
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx";
    const password = "demo123";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid long password", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "demo";
    const password =
      "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid neat-uri", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "demo!";
    const password = "demo123";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid email regexp", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "demo@x.i!";
    const password = "demo123";
    const res = isValid(principal, password);

    expect(res).toBe(false);
  });

  test("isValid OK", () => {
    const { result } = renderHook(() => useLoginForm());
    const { isValid } = result.current;

    const principal = "demo";
    const password = "demo123";
    const res = isValid(principal, password);

    expect(res).toBe(true);
  });
});
