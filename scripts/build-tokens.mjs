// tokens/patterns/<パターン>/tokens.json（各パターンの正本）から、パターンごとに
// CSS 変数・TS 定数・DESIGN.md（トークン表 + guide.md）を生成する。
// 生成の前に全パターンを検証し、1 つでも失敗したら何も書き出さずに終える（壊れた生成物をコミットさせないため）。
import { readdirSync, readFileSync } from "node:fs";
import StyleDictionary from "style-dictionary";

const PatternsDir = "tokens/patterns";
const ReferencesDir = "plugins/design-system/skills/design-system/references";
/** 見本ページで複数パターンを同時に読み込んで切り替えるため、:root ではなくこの属性に変数を載せた CSS も出す */
const PatternAttribute = "data-design-pattern";
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

const renderTokenTables = (tokens) => {
  const categories = [...new Set(tokens.map((t) => t.path[0]))];
  return categories.map((category) => {
    const rows = tokens
      .filter((t) => t.path[0] === category)
      .map((t) => `| \`${t.path.join(".")}\` | \`var(--${t.name})\` | \`${escapeCell(formatValue(t))}\` | ${escapeCell(t.$description)} |`);
    return [`### ${category}`, "", "| トークン | CSS 変数 | 値 | 使いどころ |", "| --- | --- | --- | --- |", ...rows].join("\n");
  });
};

/**
 * パターンの DESIGN.md。Claude 以外のエージェントや人もこれ 1 枚で読めるよう、手書きの guide.md と生成したトークン表を合わせる。
 * トークン表は入れ子の JSON より読みやすくトークンも少ないため、カテゴリごとの表にする。
 */
StyleDictionary.registerFormat({
  name: "design-vault/design-md",
  format: ({ dictionary, options }) => {
    const header = [
      `<!-- 生成物。${PatternsDir}/${options.pattern}/ の tokens.json と guide.md を直して pnpm build:tokens で作り直す。手で書き換えない。 -->`,
      "",
      `# ${options.pattern} パターン`,
    ].join("\n");
    const tokensSection = ["## トークン", "", "実装では CSS 変数を使い、値を直書きしない。", ...renderTokenTables(dictionary.allTokens)].join("\n\n");
    return `${[header, options.guide.trim(), tokensSection].join("\n\n")}\n`;
  },
});

const createDictionary = (pattern) =>
  new StyleDictionary({
    source: [`${PatternsDir}/${pattern}/tokens.json`],
    log: { warnings: "error", verbosity: "verbose" },
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: `dist/${pattern}/`,
        files: [
          { destination: "tokens.css", format: "css/variables" },
          {
            destination: "tokens.scoped.css",
            format: "css/variables",
            options: { selector: `[${PatternAttribute}="${pattern}"]` },
          },
        ],
      },
      ts: {
        transformGroup: "js",
        buildPath: `dist/${pattern}/`,
        files: [{ destination: "tokens.ts", format: "javascript/es6" }],
      },
      markdown: {
        transformGroup: "css",
        buildPath: `${ReferencesDir}/${pattern}/`,
        files: [
          {
            destination: "DESIGN.md",
            format: "design-vault/design-md",
            options: { pattern, guide: readFileSync(`${PatternsDir}/${pattern}/guide.md`, "utf8") },
          },
        ],
      },
    },
  });

const patterns = readdirSync(PatternsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .toSorted();
const dictionaries = patterns.map((pattern) => ({ pattern, sd: createDictionary(pattern) }));

const tokensByPattern = await Promise.all(
  dictionaries.map(async ({ pattern, sd }) => ({ pattern, tokens: (await sd.getPlatformTokens("css")).allTokens })),
);

/**
 * 全パターンが同じトークン名の集合を持つことを確かめる。利用側が tokens.css を差し替えるだけでパターンを
 * 切り替えられるよう、名前はパターン間の約束として揃える（値と使い分けだけがパターンごとに違う）。
 */
const collectNameMismatchErrors = () => {
  const namesOf = (tokens) => new Set(tokens.map((t) => t.path.join(".")));
  const [first, ...rest] = tokensByPattern;
  const expected = namesOf(first?.tokens ?? []);
  return rest.flatMap(({ pattern, tokens }) => {
    const actual = namesOf(tokens);
    const missing = [...expected].filter((n) => !actual.has(n)).map((n) => `${pattern}: ${first.pattern} にある ${n} がない`);
    const extra = [...actual].filter((n) => !expected.has(n)).map((n) => `${pattern}: ${n} が ${first.pattern} にない`);
    return [...missing, ...extra];
  });
};

const errors = [
  ...tokensByPattern.flatMap(({ pattern, tokens }) =>
    [...collectColorFormatErrors(tokens), ...collectContrastErrors(tokens)].map((e) => `${pattern}: ${e}`),
  ),
  ...collectNameMismatchErrors(),
];
for (const error of errors) console.error(`::error::${error}`);
if (errors.length > 0) process.exit(1);

for (const { sd } of dictionaries) await sd.buildAllPlatforms();
