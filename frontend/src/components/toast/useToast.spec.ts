import { renderHook, act as hookAct } from "@testing-library/react-hooks";
import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import { initState } from "./reducer";
import useToast from "./useToast";

describe("useToast", () => {
  test("initial state", () => {
    const { result } = renderHook(() => useToast());

    const { show, msg, severity } = result.current;

    expect(show).toEqual(initState.show);
    expect(msg).toEqual(initState.msg);
    expect(severity).toEqual(initState.severity);
  });

  test("toastClose", () => {
    const { result } = renderHook(() => useToast());

    const { toastClose } = result.current;

    hookAct(() => {
      toastClose();
    });

    const { show } = result.current;

    expect(show).toEqual(false);
  });

  test("toastError", async () => {
    const { result } = renderHook(() => useToast());

    const { toastError } = result.current;

    const errMsg = "ERROR";

    hookAct(() => {
      toastError(errMsg);
    });

    const { msg } = result.current;
    expect(msg).toEqual(errMsg);
  });

  test("toastLoading", async () => {
    const { result } = renderHook(() => useToast());

    const { toastLoading, toastSetDuration } = result.current;

    hookAct(() => {
      // setDurations for shorter waiting time
      toastSetDuration(300, 300);
      toastLoading();
    });

    const { msg } = result.current;
    expect(msg).toEqual(TOAST_MSG_LOADING);
  });

  test("toastLoading delays", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast());

    const { toastLoading, toastSetDuration } = result.current;

    hookAct(() => {
      // setDurations for shorter waiting time
      toastSetDuration(300, 300);
      toastLoading();
    });

    const { msg } = result.current;
    expect(msg).toEqual(TOAST_MSG_LOADING);

    hookAct(() => {
      jest.advanceTimersByTime(305);
    });
    const { msg: msg2 } = result.current;
    expect(msg2).toEqual(TOAST_MSG_LONGER);

    hookAct(() => {
      jest.advanceTimersByTime(305);
    });
    const { msg: msg3 } = result.current;
    expect(msg3).toEqual(MSG_SOMETHING_WENT_WRONG);

    hookAct(() => {
      jest.advanceTimersByTime(305);
    });
    const { show } = result.current;
    expect(show).toEqual(false);
  });
});
