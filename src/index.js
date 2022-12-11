import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./components/ui/layout/layout";
import MainBackround from "./components/ui/main-backround/main-background";
import { CartContextProvider } from "./store/Cart-Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <Layout>
      <MainBackround />
      <App />
    </Layout>
  </CartContextProvider>
);
