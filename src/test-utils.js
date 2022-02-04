import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const customRender = (ui, options = {}) => {
  const { store, ...renderOptions } = options;
  const history = createMemoryHistory();

  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
export { customRender as render };
