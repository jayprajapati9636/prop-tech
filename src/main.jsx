import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store"; // Ensure this path is correct
import App from "./App";
import "./index.css"; // Tailwind CSS if applicable

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap App in Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);
