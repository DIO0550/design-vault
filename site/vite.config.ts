import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // pnpm のスクリプトはリポジトリのルートで走るので、root はルートからの相対で書く
  root: "site",
  // GitHub Pages はリポジトリ名のサブパス（https://dio0550.github.io/design-vault/）で配信される
  base: "/design-vault/",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
  // 正本と生成物はリポジトリのルートにあるため、site/ の外の読み込みを許す
  server: { fs: { allow: [".."] } },
});
