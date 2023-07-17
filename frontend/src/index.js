import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider, GlobalStyles } from "@mantine/core";

import { Provider } from "react-redux";
import store from "./state/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

const Application = () => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        globalStyles: (theme) => ({
          body: {
            //color:
            //theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
            lineHeight: theme.lineHeight,
            fontFamily: "Poppins",
          },
        }),
      }}
      // withGlobalStyles
      // withNormalizeCSS
    >
      <App />
    </MantineProvider>
  );
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Application />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
