import { renderHook, act as hookAct } from "@testing-library/react-hooks";
import { useReducer } from "react";
import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import { initState, toastReducer } from "./reducer";

describe("toastReducer", () => {
  test("initial state works correctly", () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));

    const [state] = result.current;

    expect(state).toEqual(initState);
  });

  test("dispatch 'close'", () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));

    const [, dispatch] = result.current;

    hookAct(() => {
      dispatch({ type: "close" });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({ ...initState, show: false, msg: "" });
  });

  test("dispatch 'loading'", async () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));
    const [, dispatch] = result.current;

    hookAct(() => {
      dispatch({ type: "loading" });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({
      ...initState,
      msg: TOAST_MSG_LOADING,
      severity: "warning",
      show: true,
    });
  });

  test("dispatch 'long'", async () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));
    const [, dispatch] = result.current;

    hookAct(() => {
      dispatch({ type: "long" });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({
      ...initState,
      msg: TOAST_MSG_LONGER,
      severity: "warning",
      show: true,
    });
  });

  test("dispatch 'timeout'", async () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));
    const [, dispatch] = result.current;

    hookAct(() => {
      dispatch({ type: "timeout" });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({
      ...initState,
      msg: MSG_SOMETHING_WENT_WRONG,
      severity: "error",
      show: true,
    });
  });

  test("dispatch 'success'", async () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));
    const [, dispatch] = result.current;

    const payload = "SUCCESS";
    hookAct(() => {
      dispatch({ type: "success", payload });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({
      ...initState,
      msg: payload,
      severity: "success",
      show: true,
    });
  });

  test("dispatch 'error'", async () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));
    const [, dispatch] = result.current;

    const payload = "ERROR";
    hookAct(() => {
      dispatch({ type: "error", payload });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({
      ...initState,
      msg: payload,
      severity: "error",
      show: true,
    });
  });

  test("dispatch default w/ empty payload", async () => {
    const { result } = renderHook(() => useReducer(toastReducer, initState));
    const [, dispatch] = result.current;

    hookAct(() => {
      dispatch({ type: "error" });
    });

    // we need to get the most recent state values
    const [state] = result.current;

    expect(state).toEqual({
      ...initState,
      msg: "",
      severity: "error",
      show: true,
    });
  });
});
