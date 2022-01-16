import { render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import AppStore from "../../store";

// const renderW = (ui: ReactElement, { store = AppStore, ...options } = {}) =>
//   rtlRender(ui, {
//     wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
//     ...options,
//   });

export const AppWrapper: React.FC = ({ children }) => (
  <Provider store={AppStore}>{children}</Provider>
);

const renderW = (ui: ReactElement) => {
  const { rerender, ...result } = rtlRender(
    // <Provider store={AppStore}>{ui}</Provider>
    <AppWrapper>{ui}</AppWrapper>
  );

  return {
    ...result,
    rerender: (rui: ReactElement) =>
      rerender(
        // <Provider store={AppStore}>{rUI}</Provider>
        <AppWrapper>{rui}</AppWrapper>
      ),
  };
};

export default renderW;
