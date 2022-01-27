import sleep from "./sleep";

describe("sleep", () => {
  test("sleep default", async () => {
    jest.useFakeTimers();

    const myFn = jest.fn();

    expect(sleep).toBeDefined();

    sleep().then(myFn);

    jest.advanceTimersByTime(100);
    await Promise.resolve();
    expect(myFn).not.toBeCalled();

    jest.advanceTimersByTime(200);
    await Promise.resolve();
    expect(myFn).toBeCalled();
  });

  test("sleep with delay given", async () => {
    jest.useFakeTimers();

    const myFn = jest.fn();

    expect(sleep).toBeDefined();

    sleep(1000).then(myFn);

    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(myFn).not.toBeCalled();

    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(myFn).toBeCalled();
  });
});
