---
version: "alpha"
name: "editorial"
description: "読み物・ドキュメント・ナレッジベース向けの温かみのある紙調テーマ。生成りの地とゆったりした行間・余白で長文の可読性を優先する。"
colors:
  bg:
    default: "#fffdf9"
    subtle: "#f6f2ea"
    canvas: "#efeae0"
    hover: "#ebe5d9"
    inverse: "#241f1a"
  text:
    default: "#241f1a"
    muted: "#62584e"
    placeholder: "#7d7267"
    subtle: "#968a7e"
    disabled: "#bfb5a8"
    inverse: "#fffdf9"
  border:
    default: "#dfd8cc"
    subtle: "#ede8de"
    strong: "#bfb5a6"
  primary:
    default: "#9a3412"
    subtle: "#fef1e6"
    "on": "#ffffff"
  component:
    default: "#6d4c9e"
  danger:
    default: "#b82e2e"
    subtle: "#fbeaea"
    "on": "#ffffff"
  success:
    default: "#2b6e44"
    subtle: "#e8f3ec"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1.25
  heading-md:
    fontFamily: "Inter"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.4
  label:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.8
  body:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  body-sm:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
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
  sm: "2px"
  md: "6px"
  lg: "10px"
  full: "9999px"
spacing:
  "2xs": "2px"
  xs: "6px"
  sm: "12px"
  md: "20px"
  lg: "40px"
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

<!-- 生成物。tokens/patterns/editorial/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# editorial

## Overview

読み物・ドキュメント・ナレッジベース向けの温かみのある紙調テーマ。生成りの地とゆったりした行間・余白で長文の可読性を優先する。

## Colors

- 純白ではなく温かみのある `color.bg.default` と `color.bg.canvas` を使い、長文閲覧時の目の負担を抑える
- 本文には純黒ではなく焦げ茶寄りの `color.text.default` を使い、紙に印刷されたインクのような落ち着いたコントラストにする
- `color.primary.default`（テラコッタ系）はリンクや主要アクションに絞り、本文の集中を妨げない

## Typography

- 本文は `typography.body` を基本とし、1 行の長さが広がりすぎないよう配慮する
- 記事タイトルは `typography.heading-lg`、章見出しは `typography.heading-md` で明確なリズムを作る

## Layout

- 余白は他パターンより広めに取っている。章の切れ目には `space.lg`、段落やカード間には `space.md` を使う

## Shapes

- 角丸は控えめ（`radius.sm` 〜 `radius.md`）に保ち、書籍や雑誌の紙面に近い端正な印象を維持する

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 記事本文の行間と余白は `typography.body` と `space.lg` に任せる | 高密度ツールのように `space.xs` で要素を詰め込む |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#fffdf9` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#f6f2ea` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#efeae0` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#ebe5d9` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#241f1a` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#241f1a` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#62584e` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#7d7267` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#968a7e` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#bfb5a8` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#fffdf9` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#dfd8cc` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#ede8de` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#bfb5a6` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#9a3412` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#fef1e6` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#6d4c9e` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#b82e2e` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#fbeaea` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#2b6e44` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#e8f3ec` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 30px/1.25 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 記事・ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `700 21px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 章・セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 13px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | カテゴリ・フォームラベル |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 18px/1.8 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | リード文・導入段落 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 16px/1.8 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 長文を読みやすくする本文の既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 14px/1.65 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 注釈・サイド情報・表 |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `400 12px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 図表キャプション・日付 |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 14px/1.6 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コードスニペット・トークン名 |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `6px` | 要素内の小さな隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `12px` | 段落や関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `20px` | カードの内側の余白・既定の間隔 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `40px` | 章・セクションどうしの広い余白 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `2px` | タグなど小さな要素 |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `6px` | 入力欄・ボタン |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `10px` | カード・引用枠・ダイアログ |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | アバター・ピル |
