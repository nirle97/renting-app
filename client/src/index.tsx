import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App/App";
import { Provider } from "react-redux";
import store from "./store/store";
// export const store = createStore(
//   rootReducer,
//   (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION__ &&
//   (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
