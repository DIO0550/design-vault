// tokens/tokens.json（正本）から、CSS 変数・TS 定数・AI 向けの Markdown を生成する。
// 生成の前にトークンを検証し、失敗したら何も書き出さずに終える（壊れた生成物をコミットさせないため）。
import StyleDictionary from "style-dictionary";

const Source = "tokens/tokens.json";
const ReferencesDir = "plugins/design-system/skills/design-system/references/";
const ExtensionKey = "design-vault";
const MinimumContrastRatio = 4.5;

/** WCAG 2.x の相対輝度。#rrggbb だけを受け付ける（正本の色はすべてこの形で書く）。 */
const relativeLuminance = (hex) => {
  const channels = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a, b) => {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].toSorted((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const HexColorPattern = /^#[0-9a-f]{6}$/;

const collectColorFormatErrors = (tokens) =>
  tokens
    .filter((t) => t.$type === "color" && !HexColorPattern.test(t.$value))
    .map((t) => `${t.path.join(".")}: 色は小文字の #rrggbb で書く（現在: ${t.$value}）`);

const collectContrastErrors = (tokens) => {
  const byRef = new Map(tokens.map((t) => [`{${t.path.join(".")}}`, t]));
  return tokens.flatMap((t) =>
    (t.original.$extensions?.[ExtensionKey]?.contrastWith ?? []).flatMap((ref) => {
      const background = byRef.get(ref);
      if (background === undefined) return [`${t.path.join(".")}: contrastWith の参照先 ${ref} がない`];
      const ratio = contrastRatio(t.$value, background.$value);
      return ratio >= MinimumContrastRatio
        ? []
        : [`${t.path.join(".")} on ${ref}: コントラスト比 ${ratio.toFixed(2)} が ${MinimumContrastRatio} 未満`];
    }),
  );
};

const formatValue = (token) => {
  if (Array.isArray(token.$value)) return token.$value.join(", ");
  if (typeof token.$value === "object") return Object.entries(token.$value).map(([k, v]) => `${k}: ${v}`).join("; ");
  return String(token.$value);
};

const escapeCell = (text) => String(text ?? "").replaceAll("|", "\\|");

/** AI 向けの一覧。入れ子の JSON より表のほうが読みやすくトークンも少ないため、カテゴリごとの表にする。 */
StyleDictionary.registerFormat({
  name: "design-vault/markdown",
  format: ({ dictionary }) => {
    const categories = [...new Set(dictionary.allTokens.map((t) => t.path[0]))];
    const sections = categories.map((category) => {
      const rows = dictionary.allTokens
        .filter((t) => t.path[0] === category)
        .map((t) => `| \`${t.path.join(".")}\` | \`var(--${t.name})\` | \`${escapeCell(formatValue(t))}\` | ${escapeCell(t.$description)} |`);
      return [`## ${category}`, "", "| トークン | CSS 変数 | 値 | 使いどころ |", "| --- | --- | --- | --- |", ...rows].join("\n");
    });
    const header = [
      "<!-- 生成物。tokens/tokens.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->",
      "",
      "# デザイントークン一覧",
      "",
      "実装では CSS 変数を使い、値を直書きしない。",
    ].join("\n");
    return `${[header, ...sections].join("\n\n")}\n`;
  },
});

const sd = new StyleDictionary({
  source: [Source],
  log: { warnings: "error", verbosity: "verbose" },
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "dist/",
      files: [{ destination: "tokens.css", format: "css/variables" }],
    },
    ts: {
      transformGroup: "js",
      buildPath: "dist/",
      files: [{ destination: "tokens.ts", format: "javascript/es6" }],
    },
    markdown: {
      transformGroup: "css",
      buildPath: ReferencesDir,
      files: [{ destination: "tokens.md", format: "design-vault/markdown" }],
    },
  },
});

const { allTokens } = await sd.getPlatformTokens("css");
const errors = [...collectColorFormatErrors(allTokens), ...collectContrastErrors(allTokens)];
for (const error of errors) console.error(`::error::${error}`);
if (errors.length > 0) process.exit(1);

await sd.buildAllPlatforms();
