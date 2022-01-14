import { render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import AppStore from "../../store";

const renderW = (ui: ReactElement, { store = AppStore, ...options } = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options,
  });

export default renderW;
