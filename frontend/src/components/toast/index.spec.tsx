import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TOAST_MSG_LOADING } from "./constants";
import Toast from "./index";

describe("Toast component", () => {
  test("Toast onExit should work even ignoreClickAway is not specified", async () => {
    const onExited = jest.fn();

    render(
      <>
        <div data-testid="other-element">
          <p>other element</p>
        </div>

        <Toast
          show={true}
          msg={TOAST_MSG_LOADING}
          severity="error"
          onExited={onExited}
        />
      </>
    );

    const divContainer = screen.getByTestId("other-element");
    await userEvent.click(divContainer);

    expect(onExited).toBeCalledTimes(0);
  });

  test("Toast ignoreClickAway = false", async () => {
    const onExited = jest.fn();

    render(
      <>
        <div data-testid="other-element">
          <p>other element</p>
        </div>

        <Toast
          show={true}
          msg="test msg"
          severity="error"
          onExited={onExited}
          ignoreClickAway={false}
        />
      </>
    );

    const divContainer = screen.getByTestId("other-element");
    await userEvent.click(divContainer);

    expect(onExited).toBeCalledTimes(1);
  });

  test("Toast ignoreClickAway = true", async () => {
    const onExited = jest.fn();

    render(
      <>
        <div data-testid="other-element">
          <p>other element</p>
        </div>

        <Toast
          show={true}
          msg="test msg"
          severity="error"
          onExited={onExited}
          ignoreClickAway={true}
        />
      </>
    );

    const divContainer = screen.getByTestId("other-element");
    await userEvent.click(divContainer);

    expect(onExited).toBeCalledTimes(0);
  });

  test("Toast loading msg should not bea able to exit", async () => {
    const onExited = jest.fn();

    render(
      <>
        <div data-testid="other-element">
          <p>other element</p>
        </div>

        <Toast
          show={true}
          msg={TOAST_MSG_LOADING}
          severity="error"
          onExited={onExited}
          ignoreClickAway={true}
        />
      </>
    );

    const divContainer = screen.getByTestId("other-element");
    await userEvent.click(divContainer);

    expect(onExited).toBeCalledTimes(0);
  });
});
