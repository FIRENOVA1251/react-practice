import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import "./index.css"; // 如果你有全局样式，可以在这里引入

// React 18 或更高版本使用 createRoot 渲染应用
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!); // 使用非空断言确保 'root' 元素存在
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
