---
version: "alpha"
name: "forest"
description: "目の疲れを抑えたセージグリーン基調の長時間作業向けテーマ。メモ・タスク管理・学習ツールなど、落ち着いて集中したいアプリケーションに適している。"
colors:
  bg:
    default: "#fbfcfa"
    subtle: "#f1f4ef"
    canvas: "#e8ede6"
    hover: "#e1e8de"
    inverse: "#1b2620"
  text:
    default: "#1b2620"
    muted: "#4f6056"
    placeholder: "#6c7f74"
    subtle: "#7e9186"
    disabled: "#b1bfb7"
    inverse: "#fbfcfa"
  border:
    default: "#d2dcd5"
    subtle: "#e4ebe6"
    strong: "#a7b8ad"
  primary:
    default: "#1e6046"
    subtle: "#e3f1ea"
    "on": "#ffffff"
  component:
    default: "#7c3aed"
  danger:
    default: "#b91c1c"
    subtle: "#fbe9e9"
    "on": "#ffffff"
  success:
    default: "#166534"
    subtle: "#e4f4ea"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.5
  body-lg:
    fontFamily: "Inter"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Inter"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "13.5px"
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

<!-- 生成物。tokens/patterns/forest/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# forest

## Overview

目の疲れを抑えたセージグリーン基調の長時間作業向けテーマ。メモ・タスク管理・学習ツールなど、落ち着いて集中したいアプリケーションに適している。

## Colors

- わずかに緑みを帯びた淡い `color.bg.default` と `color.bg.canvas` を使い、純白の眩しさを和らげる
- 主要アクションには深みのある `color.primary.default`（フォレストグリーン）を使い、穏やかさと操作の明快さを両立する

## Typography

- 読みやすさと画面収まりのバランスを取った `typography.body` を既定とする

## Layout

- 圧迫感を避けるため、要素内には `space.md`、セクション間には `space.lg` の余白を保つ

## Shapes

- 柔らかな印象になる `radius.md` と `radius.lg` を基本に使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 落ち着いた印象を保つため面の色は `color.bg.*` のセージ系で統一する | 純白や原色のアクセントを混ぜてコントラストを過剰に尖らせる |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#fbfcfa` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#f1f4ef` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#e8ede6` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#e1e8de` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#1b2620` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#1b2620` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#4f6056` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#6c7f74` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#7e9186` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#b1bfb7` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#fbfcfa` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#d2dcd5` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#e4ebe6` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#a7b8ad` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#1e6046` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#e3f1ea` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#7c3aed` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#b91c1c` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#fbe9e9` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#166534` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#e4f4ea` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 26px/1.3 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 19px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 13px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | フォームのラベル・強調したい行 |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 17px/1.75 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | リード文 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 15px/1.7 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 本文の既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 13px/1.6 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 補足・サイドバー・バッジ |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `400 12px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 注記。本文には使わない |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 13.5px/1.6 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・トークン名 |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | 要素内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `16px` | コンポーネントの内側の余白 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `32px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `4px` | タグ・小さな要素 |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `8px` | 入力欄・ボタン・カード |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `12px` | ダイアログ・大きなカード |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | 丸ボタン・ピル |
