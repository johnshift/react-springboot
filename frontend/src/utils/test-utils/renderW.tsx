import { render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import AppStore from "../../store";

// const renderW = (ui: ReactElement, { store = AppStore, ...options } = {}) =>
//   rtlRender(ui, {
//     wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
//     ...options,
//   });

const renderW = (ui: ReactElement) => {
  const { rerender, ...result } = rtlRender(
    <Provider store={AppStore}>{ui}</Provider>
  );

  return {
    ...result,
    rerender: (rUI: ReactElement) =>
      rerender(<Provider store={AppStore}>{rUI}</Provider>),
  };
};

export default renderW;
