---
version: "alpha"
name: "obsidian"
description: "開発者コンソール・ダークモードアプリ向けの高コントラスト暗色テーマ。長時間の作業でも眩しさを抑え、境界線と面の明度差で階層を伝える。"
colors:
  bg:
    default: "#16181d"
    subtle: "#1e2128"
    canvas: "#0f1115"
    hover: "#262a33"
    inverse: "#f3f4f6"
  text:
    default: "#eef0f4"
    muted: "#9aa1b0"
    placeholder: "#7d8594"
    subtle: "#6b7280"
    disabled: "#4b515e"
    inverse: "#111318"
  border:
    default: "#2b303b"
    subtle: "#222630"
    strong: "#3e4554"
  primary:
    default: "#2563eb"
    subtle: "#172642"
    "on": "#ffffff"
  component:
    default: "#a78bfa"
  danger:
    default: "#f87171"
    subtle: "#361c20"
    "on": "#16181d"
  success:
    default: "#4ade80"
    subtle: "#162e22"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
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
    lineHeight: 1.55
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
  sm: "4px"
  md: "6px"
  lg: "10px"
  full: "9999px"
spacing:
  "2xs": "2px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "28px"
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

<!-- 生成物。tokens/patterns/obsidian/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# obsidian

## Overview

開発者コンソール・ダークモードアプリ向けの高コントラスト暗色テーマ。長時間の作業でも眩しさを抑え、境界線と面の明度差で階層を伝える。

## Colors

- 面の階層は暗→明で表現する（作業領域 `color.bg.canvas` → カード・パネル `color.bg.default` → 入力欄 `color.bg.subtle` → ホバー `color.bg.hover`）
- 暗色背景で影が目立ちにくいため、面どうしの区切りには `color.border.default` と `color.border.subtle` を明確に使う
- `color.primary.default` は主要な操作とフォーカスリングに限定し、選択行の地には彩度を抑えた `color.primary.subtle` を使う
- エラー表示は `color.danger.default`（明るい赤）を文字と枠に使い、地には暗い `color.danger.subtle` を合わせる

## Typography

- UI の既定は `typography.body`（14px）。テーブルやインスペクタは `typography.body-sm` を使う
- コマンド・ID・ログ・数値には `typography.code` を使い、視認性を揃える

## Layout

- パネル内余白は `space.md`、関連要素どうしは `space.sm` を基本にし、情報密度と余白のバランスを保つ

## Shapes

- ボタン・入力欄は引き締まった `radius.md`、カードやモーダルは `radius.lg` を使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 暗色背景で階層を示すときは `color.bg.canvas` と `color.bg.default` の明度差と `color.border.default` を使う | 強いドロップシャドウだけで面を分けようとする |
| 選択行の背景には `color.primary.subtle` を使い文字は `color.text.default` のままにする | 選択行に `color.primary.default` を広く敷き詰める |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#16181d` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#1e2128` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#0f1115` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#262a33` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#f3f4f6` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#eef0f4` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#9aa1b0` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#7d8594` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#6b7280` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#4b515e` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#111318` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#2b303b` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#222630` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#3e4554` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#2563eb` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#172642` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#a78bfa` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#f87171` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#361c20` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#16181d` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#4ade80` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#162e22` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `600 24px/1.3 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 16px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | セクション・パネルの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 12px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | フォームのラベル・強調したい行 |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 16px/1.6 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | リード文・やや大きく読ませたい説明 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 14px/1.55 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文の既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 12px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | テーブル・バッジ・メタ情報 |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `500 11px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 注記・ショートカット表記 |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 13px/1.5 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・コマンド・ログ |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | 要素内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `16px` | パネル・カードの内側の余白 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `28px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `4px` | タグ・バッジ |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `6px` | 入力欄・ボタン・選択行 |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `10px` | パネル・ダイアログ・カード |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | 丸ボタン・アバター・ピル |
