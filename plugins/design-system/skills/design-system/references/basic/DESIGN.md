---
version: "alpha"
name: "basic"
description: "汎用の明るいテーマ。特定のプロダクトに寄せず、読みやすさを優先した仮のパターン。"
colors:
  bg:
    default: "#ffffff"
    subtle: "#f4f5f7"
    canvas: "#eef0f3"
    hover: "#eceef2"
    inverse: "#1b1e24"
  text:
    default: "#1b1e24"
    muted: "#5a6170"
    placeholder: "#6b7280"
    subtle: "#8a909c"
    disabled: "#b4b9c2"
    inverse: "#ffffff"
  border:
    default: "#d8dce3"
    subtle: "#e9ebef"
    strong: "#b9bfc9"
  primary:
    default: "#2c56c9"
    subtle: "#e8eefb"
    "on": "#ffffff"
  component:
    default: "#7a3fd1"
  danger:
    default: "#c0262d"
    subtle: "#fbe9ea"
    "on": "#ffffff"
  success:
    default: "#1f7a3a"
    subtle: "#e7f5ec"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.4
  label:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  "2xs": "2px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary.default}"
    textColor: "{colors.primary.on}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  button:
    backgroundColor: "{colors.bg.default}"
    textColor: "{colors.text.default}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  button-hover:
    backgroundColor: "{colors.bg.hover}"
  button-danger:
    backgroundColor: "{colors.bg.default}"
    textColor: "{colors.danger.default}"
  button-ghost:
    textColor: "{colors.text.muted}"
  button-disabled:
    backgroundColor: "{colors.bg.subtle}"
    textColor: "{colors.text.disabled}"
  input:
    backgroundColor: "{colors.bg.subtle}"
    textColor: "{colors.text.default}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  input-label:
    textColor: "{colors.text.muted}"
    typography: "{typography.label}"
  input-placeholder:
    textColor: "{colors.text.placeholder}"
  input-error:
    textColor: "{colors.danger.default}"
    typography: "{typography.body-sm}"
  list-row:
    textColor: "{colors.text.default}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  list-row-hover:
    backgroundColor: "{colors.bg.hover}"
  list-row-selected:
    backgroundColor: "{colors.primary.subtle}"
    textColor: "{colors.text.default}"
  list-row-component:
    textColor: "{colors.component.default}"
  panel:
    backgroundColor: "{colors.bg.default}"
    textColor: "{colors.text.default}"
    padding: "{spacing.md}"
  panel-title:
    typography: "{typography.heading-md}"
  panel-section-title:
    typography: "{typography.label}"
  badge:
    backgroundColor: "{colors.bg.hover}"
    textColor: "{colors.text.muted}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  badge-selected:
    backgroundColor: "{colors.primary.default}"
    textColor: "{colors.primary.on}"
  badge-success:
    backgroundColor: "{colors.success.subtle}"
    textColor: "{colors.success.default}"
  badge-danger:
    textColor: "{colors.danger.default}"
---

<!-- 生成物。tokens/patterns/basic/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# basic

## Overview

汎用の明るいテーマ。特定のプロダクトに寄せず、読みやすさを優先した仮のパターン。

## Colors

- 文字と地は、組で決まっている。`color.text.*` は `color.bg.*` の上、`color.primary.on` は `color.primary.default` の上、`color.danger.on` は `color.danger.default` の上で使う。この組はコントラスト比 4.5:1 以上を確かめてある
- `color.primary.*` は主要な操作（1 画面で目立たせたい操作）とリンク、フォーカスリングに使う。装飾のためには使わない
- `color.danger.*` は削除などの破壊的な操作とエラーにだけ使う
- 区切り線や入力欄の枠は `color.border.default`、セクション内の細かな区切りは `color.border.subtle` を使う
- `color.text.subtle` `color.text.disabled` `color.text.placeholder` はコントラスト比 4.5:1 を確かめていない。補助的な表示に限って使う
- `color.component.default` は再利用する部品（コンポーネント）の目印にだけ使う

## Typography

- `typography.heading-lg` はページの見出しで、1 画面に 1 つまで
- `typography.caption` は注記用。本文には使わない
- フォームのラベルや強調したい行は `typography.label`、リード文は `typography.body-lg`
- コードやトークン名には `typography.code` を使う

## Layout

- 余白は `space.*` の 5 段階から選ぶ。迷ったら `space.md`
- 関係が近い要素ほど間を詰める（密着 `2xs` → 要素内 `xs` → 関連する要素の間 `sm` → 既定 `md` → セクションの間 `lg`）

## Shapes

- 角丸は要素の大きさで選ぶ。小さな要素は `radius.sm`、入力欄・ボタン・カードは `radius.md`、ダイアログは `radius.lg`、丸い形は `radius.full`

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 白抜き文字を primary の地に置くときは `color.primary.on` | 白抜き文字に `color.bg.default` を流用する |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#ffffff` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#f4f5f7` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#eef0f3` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#eceef2` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#1b1e24` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#1b1e24` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#5a6170` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#6b7280` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#8a909c` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#b4b9c2` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#ffffff` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#d8dce3` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#e9ebef` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#b9bfc9` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#2c56c9` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#e8eefb` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#7a3fd1` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#c0262d` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#fbe9ea` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#1f7a3a` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#e7f5ec` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 28px/1.3 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `700 20px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 14px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | フォームのラベル・強調したい行 |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 18px/1.7 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | リード文 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 16px/1.7 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 本文の既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 14px/1.6 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 密度の高い UI（表・サイドバー） |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `400 12px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 注記。本文には使わない |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 14px/1.6 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・トークン名 |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | アイコンと文字の間など、要素内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `16px` | コンポーネントの内側の余白・既定の間隔 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `32px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `4px` | タグなど小さな要素 |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `8px` | 入力欄・ボタン・カード |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `12px` | ダイアログ・大きなカード |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | 丸ボタン・アバター・ピル |
