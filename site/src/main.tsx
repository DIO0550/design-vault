import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// 全パターンの変数を data-design-pattern 属性の下に読み込み、属性の付け替えで切り替える
import.meta.glob("../../dist/*/tokens.scoped.css", { eager: true });
import "./site.css";
import "./components.css";
import { App } from "./App";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
