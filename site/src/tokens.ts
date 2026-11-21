// 正本 tokens.json をビルド時に読み込み、ページで並べるための形に平らにする（実行時には fetch しない）。
import source from "../../tokens/tokens.json";

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

export const Tokens: readonly Token[] = flatten(source as Node, [], "");

export const tokensOf = (category: string): readonly Token[] => Tokens.filter((t) => t.path.split(".")[0] === category);

export const formatValue = (value: unknown): string => {
  if (Array.isArray(value)) return value.join(", ");
  if (isNode(value)) return Object.entries(value).map(([k, v]) => `${k}: ${String(v)}`).join("; ");
  return String(value);
};
