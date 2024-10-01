import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext";
import { WorkoutContextProvider } from "./context/workoutContext";
import { LoadingContextProvider } from "./context/loadingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <LoadingContextProvider>
          <WorkoutContextProvider>
            <App />
          </WorkoutContextProvider>
        </LoadingContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
