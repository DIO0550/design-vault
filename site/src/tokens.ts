// 各パターンの正本 tokens.json と生成済み DESIGN.md をビルド時に読み込む（実行時には fetch しない）。
const sources = import.meta.glob<Record<string, unknown>>("../../tokens/patterns/*/tokens.json", {
  eager: true,
  import: "default",
});

const guides = import.meta.glob<string>("../../tokens/patterns/*/guide.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const designMds = import.meta.glob<string>("../../plugins/design-system/skills/design-system/references/*/DESIGN.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export type Token = Readonly<{
  /** `color.text.default` の形 */
  path: string;
  /** `--color-text-default` の形。Style Dictionary の css 変換と同じく path を - でつなぐ */
  cssVar: string;
  type: string;
  value: unknown;
  description: string;
  /** 文字色の側に宣言した、コントラストを確かめた地のトークン（`color.bg.default` の形） */
  contrastWith: readonly string[];
}>;

type Node = { [key: string]: unknown };

const isNode = (value: unknown): value is Node => typeof value === "object" && value !== null && !Array.isArray(value);

const readContrastWith = (node: Node): readonly string[] => {
  const extensions = isNode(node.$extensions) ? node.$extensions : {};
  const own = isNode(extensions["design-vault"]) ? extensions["design-vault"] : {};
  const refs = Array.isArray(own.contrastWith) ? own.contrastWith : [];
  return refs.map((ref) => String(ref).replace(/^\{|\}$/g, ""));
};

const flatten = (node: Node, path: readonly string[], inheritedType: string): readonly Token[] => {
  const type = typeof node.$type === "string" ? node.$type : inheritedType;
  if ("$value" in node) {
    return [
      {
        path: path.join("."),
        cssVar: `--${path.join("-")}`,
        type,
        value: node.$value,
        description: typeof node.$description === "string" ? node.$description : "",
        contrastWith: readContrastWith(node),
      },
    ];
  }
  return Object.entries(node)
    .filter(([key, child]) => !key.startsWith("$") && isNode(child))
    .flatMap(([key, child]) => flatten(child as Node, [...path, key], type));
};

export type Pattern = Readonly<{ name: string; tokens: readonly Token[] }>;

/** パターン名はフォルダ名。名前順に並べる */
export const Patterns: readonly Pattern[] = Object.entries(sources)
  .map(([file, source]) => ({
    name: file.split("/").at(-2) ?? file,
    tokens: flatten(source as Node, [], ""),
  }))
  .toSorted((a, b) => a.name.localeCompare(b.name));

export const tokensOf = (pattern: Pattern, category: string): readonly Token[] =>
  pattern.tokens.filter((t) => t.path.split(".")[0] === category);

export const formatValue = (value: unknown): string => {
  if (Array.isArray(value)) return value.join(", ");
  if (isNode(value)) return Object.entries(value).map(([k, v]) => `${k}: ${String(v)}`).join("; ");
  return String(value);
};

/** guide.md の最初の段落を、コード表記の記号を外して 1 文の説明として使う */
export const introOf = (pattern: Pattern): string => {
  const entry = Object.entries(guides).find(([file]) => file.split("/").at(-2) === pattern.name);
  const firstParagraph = entry?.[1].trim().split(/\n\s*\n/)[0] ?? "";
  return firstParagraph.replaceAll("`", "").replaceAll("\n", "");
};

const valueAt = (pattern: Pattern, path: string): unknown => pattern.tokens.find((t) => t.path === path)?.value;

/** パターン選択とホームに出す一言（文字・本文の大きさ・アクセント） */
export const summaryOf = (pattern: Pattern): string => {
  const families = valueAt(pattern, "font.family.sans");
  const font = Array.isArray(families) ? String(families[0]) : "";
  const body = valueAt(pattern, "typography.body");
  const size = isNode(body) ? String(body.fontSize) : "";
  const primary = String(valueAt(pattern, "color.primary.default") ?? "");
  return `${font} · ${size} · ${primary}`;
};

const relativeLuminance = (hex: string): number => {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) return 1;
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** color.bg.canvas の相対輝度から light / dark を自動判定する */
export const modeOf = (pattern: Pattern): "light" | "dark" => {
  const canvas = String(valueAt(pattern, "color.bg.canvas") ?? "#ffffff");
  return relativeLuminance(canvas) < 0.2 ? "dark" : "light";
};

/** 生成済みの DESIGN.md の本文を返す */
export const designMdOf = (pattern: Pattern): string => {
  const entry = Object.entries(designMds).find(([file]) => file.split("/").at(-2) === pattern.name);
  return entry?.[1] ?? "";
};

/** ブラウザ上で <pattern>-DESIGN.md を直接ダウンロードさせる */
export const downloadDesignMd = (pattern: Pattern): void => {
  const content = designMdOf(pattern);
  if (!content) return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${pattern.name}-DESIGN.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};
