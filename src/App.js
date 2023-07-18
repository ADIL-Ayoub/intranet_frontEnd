import React, { useState, useEffect } from "react";
import Router from "./Router";
import { useColors, useIsDarkMode } from "@common";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { Toast } from "@components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const Colors = useColors();
  const isDark = true; //useIsDarkMode();

  return (
    <div className="App" style={{ height: "100%" }}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Router />
          <Toast />
        </Provider>
      </PersistGate>
      <ToastContainer />
    </div>
  );
}

export default App;
