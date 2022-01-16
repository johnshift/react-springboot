import {
  screen,
  act,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Toast from "../src/features/toast";
import XXX from "../src/pages/xxx";
import renderW, { AppWrapper } from "../src/utils/test-utils/renderW";

import { renderHook, act as hookAct } from "@testing-library/react-hooks/dom";
import { useAppDispatch } from "../src/store";
import { setDelayParams } from "../src/features/toast/toastSlice";
import { LOGIN_MSG_INCORRECT } from "../src/features/login/constants";
import {
  TOAST_MSG_LOADING,
  TOAST_MSG_LONGER,
} from "../src/features/toast/constants";
import { MSG_SOMETHING_WENT_WRONG } from "../src/constants";

describe("XXX", () => {
  let principalField: HTMLElement;
  let loginBtn: HTMLElement;

  const { result: appDispatchResult } = renderHook(() => useAppDispatch(), {
    wrapper: AppWrapper,
  });
  const dispatch = appDispatchResult.current;

  beforeEach(() => {
    renderW(
      <>
        <XXX />
        <Toast />
      </>
    );

    principalField = screen.getByLabelText(/^username or email$/i);
    loginBtn = screen.getByRole("button", { name: /^login$/i });
  });

  test("incorrect", async () => {
    // adjust delay params to make tests short
    await hookAct(async () => {
      dispatch(
        setDelayParams({
          loadingDelay: 300,
          longDelay: 600,
          smthErrDelay: 900,
        })
      );
    });

    await userEvent.type(principalField, "asdf");
    await userEvent.click(loginBtn);

    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LOADING));
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LONGER));

    expect(screen.getByText(LOGIN_MSG_INCORRECT)).toBeInTheDocument();
  });

  test("smth", async () => {
    // adjust delay params to make tests short
    await hookAct(async () => {
      dispatch(
        setDelayParams({
          loadingDelay: 300,
          longDelay: 600,
          smthErrDelay: 900,
        })
      );
    });

    await userEvent.type(principalField, "long");
    userEvent.click(loginBtn);

    await screen.findByTestId("loginForm-skl");
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LOADING));
    await waitForElementToBeRemoved(screen.getByText(TOAST_MSG_LONGER));

    expect(screen.getByText(MSG_SOMETHING_WENT_WRONG)).toBeInTheDocument();
  });
});
