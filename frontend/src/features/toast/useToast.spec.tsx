import { renderHook, act as hookAct } from "@testing-library/react-hooks";
import { MSG_SOMETHING_WENT_WRONG } from "../../constants";
import { TOAST_MSG_LOADING, TOAST_MSG_LONGER } from "./constants";
import useToast from "./useToast";
import { initialState } from "./toastSlice";
import { AppWrapper } from "../../utils/test-utils/renderW";
import { LOGIN_MSG_OK } from "../login/constants";

describe("useToast", () => {
  test("initial state", () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { show, msg, severity } = result.current;

    expect(show).toEqual(initialState.show);
    expect(msg).toEqual(initialState.msg);
    expect(severity).toEqual(initialState.severity);
  });

  test("toastClose", () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastClose } = result.current;

    hookAct(() => {
      toastClose();
    });

    const { show } = result.current;

    expect(show).toEqual(false);
  });

  test("toastError", async () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastError } = result.current;

    const errMsg = MSG_SOMETHING_WENT_WRONG;

    hookAct(() => {
      toastError(errMsg);
    });

    const { msg } = result.current;
    expect(msg).toEqual(errMsg);
  });

  test("toastSuccess", async () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastSuccess } = result.current;

    const successMsg = LOGIN_MSG_OK;

    hookAct(() => {
      toastSuccess(successMsg);
    });

    const { msg } = result.current;
    expect(msg).toEqual(successMsg);
  });

  test("toastLoading", async () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastLoading, toastSetDurations } = result.current;

    hookAct(() => {
      // setDurations for shorter waiting time
      toastSetDurations(300, 300);
      toastLoading();
    });

    const { msg } = result.current;
    expect(msg).toEqual(TOAST_MSG_LOADING);
  });

  test("toastLonger", async () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastLonger, toastSetDurations } = result.current;

    hookAct(() => {
      // setDurations for shorter waiting time
      toastSetDurations(300, 300);
      toastLonger();
    });

    const { msg } = result.current;
    expect(msg).toEqual(TOAST_MSG_LONGER);
  });

  test("toastTimeout", async () => {
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastTimeout, toastSetDurations } = result.current;

    hookAct(() => {
      // setDurations for shorter waiting time
      toastSetDurations(300, 300);
      toastTimeout();
    });

    const { msg } = result.current;
    expect(msg).toEqual(MSG_SOMETHING_WENT_WRONG);
  });

  test("toastLoading delays", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useToast(), { wrapper: AppWrapper });

    const { toastLoading, toastSetDurations } = result.current;

    hookAct(() => {
      // setDurations for shorter waiting time
      toastSetDurations(300, 300);
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
