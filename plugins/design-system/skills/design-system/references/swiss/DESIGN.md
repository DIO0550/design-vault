---
version: "alpha"
name: "swiss"
description: "無彩色とシャープな罫線で構成するミニマルなモノクロームテーマ。装飾色を使わず、タイポグラフィの重みと余白、黒のアクセントだけで情報を整理する。"
colors:
  bg:
    default: "#ffffff"
    subtle: "#f7f7f7"
    canvas: "#f0f0f0"
    hover: "#eaeaea"
    inverse: "#111111"
  text:
    default: "#111111"
    muted: "#595959"
    placeholder: "#757575"
    subtle: "#8f8f8f"
    disabled: "#bdbdbd"
    inverse: "#ffffff"
  border:
    default: "#d9d9d9"
    subtle: "#ebebeb"
    strong: "#111111"
  primary:
    default: "#111111"
    subtle: "#ededed"
    "on": "#ffffff"
  component:
    default: "#404040"
  danger:
    default: "#c81e1e"
    subtle: "#fde8e8"
    "on": "#ffffff"
  success:
    default: "#166534"
    subtle: "#e8f5ec"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.25
  heading-md:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
  label:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Inter"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "2px"
  md: "4px"
  lg: "6px"
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

<!-- 生成物。tokens/patterns/swiss/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# swiss

## Overview

無彩色とシャープな罫線で構成するミニマルなモノクロームテーマ。装飾色を使わず、タイポグラフィの重みと余白、黒のアクセントだけで情報を整理する。

## Colors

- 主要な操作（`color.primary.default`）も黒で統一し、画面内に不要な有彩色を増やさない
- 有彩色はエラー（`color.danger.*`）と成功（`color.success.*`）の意味的状態にだけ残す
- 強調したい枠線には `color.border.strong`（黒）を使い、通常の区切り `color.border.default` と明確に差別化する

## Typography

- 見出しは太さとサイズ差で階層を示し、色分けに頼らない
- 数値・コード・メタデータには `typography.code` を使い、整列感を高める

## Layout

- グリッドと余白（`space.md` / `space.lg`）を揃え、要素の端を一直線に合わせる

## Shapes

- 角丸は最小限（`radius.sm` 2px、`radius.md` 4px）に抑え、直線的で硬質な印象を保つ

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 主要ボタンは `color.primary.default`（黒）と `color.primary.on`（白）の反転で目立たせる | 装飾のためにブランドカラーやグラデーションを足す |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#ffffff` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#f7f7f7` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#f0f0f0` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#eaeaea` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#111111` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#111111` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#595959` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#757575` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#8f8f8f` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#bdbdbd` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#ffffff` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#d9d9d9` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#ebebeb` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#111111` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#111111` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#ededed` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#404040` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#c81e1e` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#fde8e8` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#166534` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#e8f5ec` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `600 26px/1.25 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 18px/1.35 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 12px/1.4 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | フォームのラベル・見出し補助 |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 16px/1.6 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | リード文 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 14px/1.6 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | UI と本文の既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 12px/1.5 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | 表・メタ情報・バッジ |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `500 11px/1.4 Inter, 'Helvetica Neue', 'Hiragino Sans', 'Noto Sans JP', sans-serif` | 注記・インデックス番号 |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 13px/1.5 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | 要素内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `16px` | グリッドとカードの内側余白 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `32px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `2px` | タグ・小さな要素 |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `4px` | 入力欄・ボタン |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `6px` | カード・ダイアログ |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | 丸ボタン・ピル |
