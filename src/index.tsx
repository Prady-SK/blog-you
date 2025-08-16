import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
