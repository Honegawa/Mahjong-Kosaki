import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { MUI_THEME } from "./utils/material-ui/theme.ts";
import { AuthProvider } from "./utils/contexts/Auth.context.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={MUI_THEME}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
