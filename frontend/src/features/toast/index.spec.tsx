import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderW from "../../utils/test-utils/renderW";
import Toast from "./index";

import * as UseToast from "./useToast";

describe("Toast", () => {
  test("onClose", async () => {
    const toastClose = jest.fn();
    jest.spyOn(UseToast, "default").mockReturnValue({
      show: true,
      msg: "Incorrect username/email or password",
      severity: "error",
      toastClose: toastClose,
      toastSuccess: jest.fn(),
      toastError: jest.fn(),
      toastLoading: jest.fn(),
      toastLonger: jest.fn(),
      toastTimeout: jest.fn(),
      toastSetDurations: jest.fn(),
    });

    renderW(<Toast />);
    await userEvent.click(screen.getByTestId("CloseIcon"));
    expect(toastClose).toBeCalled();
  });
});
