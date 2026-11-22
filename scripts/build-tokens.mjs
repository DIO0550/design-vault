// tokens/patterns/<パターン>/tokens.json（各パターンの正本）から、パターンごとに
// CSS 変数・TS 定数・DESIGN.md（Google の DESIGN.md 仕様の形。トークン + guide.md + tokens/components.json）を生成する。
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

/**
 * DESIGN.md（https://github.com/google-labs-code/design.md の docs/spec.md、version alpha）の形で出す。
 * 正本のカテゴリ名を仕様のトップレベルのキーへ詰め替える。font は仕様にないので typography の fontFamily に畳み込む。
 */
const DesignMdCategories = { color: "colors", typography: "typography", space: "spacing", radius: "rounded" };
const ComponentsFile = "tokens/components.json";
const ComponentProperties = new Set(["backgroundColor", "textColor", "typography", "rounded", "padding", "size", "height", "width"]);
/** 仕様の節の順。guide.md の見出しはこの名前だけを使い、この順に並べる（Overview は guide.md の冒頭の段落から作る） */
const GuideSections = ["Colors", "Typography", "Layout", "Elevation & Depth", "Shapes", "Motion", "Voice & Content Strategy", "Do's and Don'ts"];

const ReferencePattern = /^\{([^}]+)\}$/;

const toDesignMdPath = (path) => {
  const [category, ...rest] = path.split(".");
  return [DesignMdCategories[category] ?? category, ...rest].join(".");
};

const toDesignMdReference = (value) => {
  const match = ReferencePattern.exec(value);
  return match === null ? value : `{${toDesignMdPath(match[1])}}`;
};

/** YAML 1.1 の読み手が真偽値や null と読む語と、記号を含む語はキーでも引用符で囲む */
const PlainYamlKey = /^[a-z][a-z0-9-]*$/i;
const AmbiguousYamlWords = new Set(["y", "n", "yes", "no", "on", "off", "true", "false", "null"]);
const yamlKey = (key) => (PlainYamlKey.test(key) && !AmbiguousYamlWords.has(key.toLowerCase()) ? key : JSON.stringify(key));
const yamlScalar = (value) => (typeof value === "number" ? String(value) : JSON.stringify(String(value)));

const renderYaml = (node, indent = "") =>
  Object.entries(node).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? [`${indent}${yamlKey(key)}:`, ...renderYaml(value, `${indent}  `)]
      : [`${indent}${yamlKey(key)}: ${yamlScalar(value)}`],
  );

const isGroup = (node) => typeof node === "object" && node !== null && !("$value" in node);

/** 正本の入れ子から $ で始まる説明を落とし、値だけの入れ子にする */
const stripToValues = (node, mapValue) =>
  Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !key.startsWith("$"))
      .map(([key, child]) => [key, isGroup(child) ? stripToValues(child, mapValue) : mapValue(child.$value)]),
  );

const readTokenAt = (source, path) => path.split(".").reduce((node, key) => node?.[key], source);

/** typography の fontFamily の参照を、その書体の並びの先頭の名前にする（仕様の fontFamily は 1 つの文字列） */
const resolveTypography = (source) => (value) => {
  const familyRef = ReferencePattern.exec(String(value.fontFamily ?? ""));
  const families = familyRef === null ? [value.fontFamily] : readTokenAt(source, familyRef[1])?.$value ?? [];
  return { ...value, fontFamily: Array.isArray(families) ? families[0] : families };
};

const renderFrontMatter = ({ pattern, description, source, components }) => {
  const document = {
    version: "alpha",
    name: pattern,
    description,
    colors: stripToValues(source.color, (v) => v),
    typography: stripToValues(source.typography, resolveTypography(source)),
    rounded: stripToValues(source.radius, (v) => v),
    spacing: stripToValues(source.space, (v) => v),
    components: Object.fromEntries(
      Object.entries(components)
        .filter(([name]) => !name.startsWith("$"))
        .map(([name, properties]) => [name, Object.fromEntries(Object.entries(properties).map(([k, v]) => [k, toDesignMdReference(v)]))]),
    ),
  };
  return ["---", ...renderYaml(document), "---"].join("\n");
};

/** guide.md を、冒頭の段落（Overview にする）と「## 見出し」ごとの節に分ける */
const splitGuide = (guide) => {
  const [intro, ...sections] = guide.trim().split(/^(?=## )/m);
  return {
    intro: intro.trim(),
    sections: sections.map((section) => ({ title: section.split("\n")[0].replace(/^## /, "").trim(), body: section.trim() })),
  };
};

const collectGuideErrors = (pattern, guide) => {
  const { intro, sections } = splitGuide(guide);
  const titles = sections.map((s) => s.title);
  const unknown = titles.filter((t) => !GuideSections.includes(t)).map((t) => `${pattern}/guide.md: 見出し「${t}」は DESIGN.md の節の名前ではない（${GuideSections.join(" / ")}）`);
  const indexes = titles.filter((t) => GuideSections.includes(t)).map((t) => GuideSections.indexOf(t));
  const outOfOrder = indexes.some((index, i) => i > 0 && index <= indexes[i - 1]) ? [`${pattern}/guide.md: 節の順が DESIGN.md の順（${GuideSections.join(" → ")}）と違う、または重なっている`] : [];
  const noIntro = intro === "" ? [`${pattern}/guide.md: 最初の見出しの前に、パターンを説明する段落（Overview になる）がない`] : [];
  return [...unknown, ...outOfOrder, ...noIntro];
};

const collectComponentErrors = (pattern, tokens, components) => {
  const names = new Set(tokens.map((t) => t.path.join(".")));
  const typographyNames = new Set(tokens.filter((t) => t.path[0] === "typography").map((t) => t.path.join(".")));
  return Object.entries(components)
    .filter(([name]) => !name.startsWith("$"))
    .flatMap(([name, properties]) =>
      Object.entries(properties).flatMap(([property, value]) => {
        const ref = ReferencePattern.exec(value)?.[1];
        if (!ComponentProperties.has(property)) return [`${ComponentsFile} ${name}.${property}: DESIGN.md の部品のプロパティにない名前`];
        if (ref === undefined) return [`${ComponentsFile} ${name}.${property}: 値は {トークン名} の参照で書く（現在: ${value}）`];
        if (!names.has(ref) && !typographyNames.has(ref)) return [`${pattern}: ${ComponentsFile} ${name}.${property} の参照先 ${ref} がない`];
        return [];
      }),
    );
};

const renderComponentsSection = () =>
  [
    "## Components",
    "",
    "部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。",
  ].join("\n");

const renderTokenTable = (tokens) => {
  const rows = tokens.map(
    (t) => `| \`${t.path.join(".")}\` | \`${toDesignMdPath(t.path.join("."))}\` | \`var(--${t.name})\` | \`${escapeCell(formatValue(t))}\` | ${escapeCell(t.$description)} |`,
  );
  return [
    "## Implementation",
    "",
    "実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。",
    "",
    "| トークン | front matter | CSS 変数 | 値 | 使いどころ |",
    "| --- | --- | --- | --- | --- |",
    ...rows,
  ].join("\n");
};

/**
 * パターンの DESIGN.md。Google の DESIGN.md 仕様（front matter の YAML にトークン、本文に節ごとの使い分け）に沿わせ、
 * Claude 以外のエージェントや DESIGN.md に対応したツールもこれ 1 枚で読めるようにする。
 * 本文は手書きの guide.md、トークンは正本 tokens.json、部品は tokens/components.json から作る。
 */
StyleDictionary.registerFormat({
  name: "design-vault/design-md",
  format: ({ dictionary, options }) => {
    const { intro, sections } = splitGuide(options.guide);
    const beforeDoDont = sections.filter((s) => s.title !== "Do's and Don'ts").map((s) => s.body);
    const doDont = sections.filter((s) => s.title === "Do's and Don'ts").map((s) => s.body);
    const body = [
      `<!-- 生成物。${PatternsDir}/${options.pattern}/ の tokens.json と guide.md、${ComponentsFile} を直して pnpm build:tokens で作り直す。手で書き換えない。 -->`,
      `# ${options.pattern}`,
      ["## Overview", "", intro].join("\n"),
      ...beforeDoDont,
      renderComponentsSection(),
      ...doDont,
      renderTokenTable(dictionary.allTokens),
    ];
    const frontMatter = renderFrontMatter({
      pattern: options.pattern,
      description: intro.replaceAll("`", "").replaceAll("\n", ""),
      source: options.source,
      components: options.components,
    });
    return `${[frontMatter, ...body].join("\n\n")}\n`;
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
            options: {
              pattern,
              guide: readFileSync(`${PatternsDir}/${pattern}/guide.md`, "utf8"),
              source: JSON.parse(readFileSync(`${PatternsDir}/${pattern}/tokens.json`, "utf8")),
              components: JSON.parse(readFileSync(ComponentsFile, "utf8")),
            },
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

const components = JSON.parse(readFileSync(ComponentsFile, "utf8"));

const errors = [
  ...tokensByPattern.flatMap(({ pattern, tokens }) =>
    [...collectColorFormatErrors(tokens), ...collectContrastErrors(tokens)].map((e) => `${pattern}: ${e}`),
  ),
  ...tokensByPattern.flatMap(({ pattern, tokens }) => collectComponentErrors(pattern, tokens, components)),
  ...patterns.flatMap((pattern) => collectGuideErrors(pattern, readFileSync(`${PatternsDir}/${pattern}/guide.md`, "utf8"))),
  ...collectNameMismatchErrors(),
];
for (const error of errors) console.error(`::error::${error}`);
if (errors.length > 0) process.exit(1);

for (const { sd } of dictionaries) await sd.buildAllPlatforms();
