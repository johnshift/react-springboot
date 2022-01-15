import { AnyAction } from "@reduxjs/toolkit";
import { LOGIN_MSG_INCORRECT } from "../login/constants";
import { newToast, toastReducer, initialState } from "./toastSlice";

describe("toastSlice", () => {
  test("initialState", () => {
    expect(toastReducer(undefined, {} as AnyAction)).toEqual(initialState);
  });

  test("newToast", () => {
    expect(
      toastReducer(
        initialState,
        newToast({ severity: "error", msg: LOGIN_MSG_INCORRECT })
      )
    ).toEqual({
      value: {
        ...initialState.value,
        duration: 3000,
        msg: LOGIN_MSG_INCORRECT,
        severity: "error",
        show: true,
      },
    });
  });
});
