---
version: "alpha"
name: "saas"
description: "業務 SaaS・管理画面・ダッシュボード向けの清潔感あるティール基調テーマ。落ち着いた寒色ニュートラルと明確なステータス色で、日々の業務操作を迷わず行えるようにする。"
colors:
  bg:
    default: "#ffffff"
    subtle: "#f4f7f7"
    canvas: "#ebf1f1"
    hover: "#e6eeee"
    inverse: "#132222"
  text:
    default: "#132222"
    muted: "#4a5f5f"
    placeholder: "#6b8080"
    subtle: "#7c9090"
    disabled: "#b0c0c0"
    inverse: "#ffffff"
  border:
    default: "#d3dfdf"
    subtle: "#e6eded"
    strong: "#a7bcbc"
  primary:
    default: "#0f766e"
    subtle: "#e6f5f3"
    "on": "#ffffff"
  component:
    default: "#6d28d9"
  danger:
    default: "#be123c"
    subtle: "#fce8ee"
    "on": "#ffffff"
  success:
    default: "#166534"
    subtle: "#e7f6ec"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Inter"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.45
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
  sm: "4px"
  md: "8px"
  lg: "12px"
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

<!-- 生成物。tokens/patterns/saas/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# saas

## Overview

業務 SaaS・管理画面・ダッシュボード向けの清潔感あるティール基調テーマ。落ち着いた寒色ニュートラルと明確なステータス色で、日々の業務操作を迷わず行えるようにする。

## Colors

- 作業領域に淡いクールグレーの `color.bg.canvas` を敷き、その上に白の `color.bg.default` カードを載せて情報のまとまりを作る
- `color.primary.default`（ティール）は主要アクション・アクティブタブ・選択状態に使い、成功（`color.success.*`）やエラー（`color.danger.*`）と意味が混ざらないよう使い分ける

## Typography

- 業務画面の一覧性を重視して `typography.body` は 14px に抑えている
- 請求番号・金額・レコード ID など桁揃えや正確さが要る値には `typography.code` を使う

## Layout

- カード内余白は `space.md`、フォーム項目間やボタン列の間隔は `space.sm` で揃える

## Shapes

- 親しみやすさと整然さを両立するため、ボタン・入力欄は `radius.md`、カードは `radius.lg` を使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 正常稼働や完了のバッジには `color.success.*` を使う | 通常の選択状態（`color.primary.*`）と成功表示を同じ色で扱う |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#ffffff` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#f4f7f7` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#ebf1f1` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#e6eeee` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#132222` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#132222` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#4a5f5f` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#6b8080` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#7c9090` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#b0c0c0` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#ffffff` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#d3dfdf` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#e6eded` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#a7bcbc` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#0f766e` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#e6f5f3` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#6d28d9` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#be123c` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#fce8ee` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#166534` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#e7f6ec` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値・ID |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 24px/1.3 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 17px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | カード・セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 13px/1.45 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | フォームのラベル・表の見出し |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 16px/1.6 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | リード文・重要な案内 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 14px/1.6 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文の既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 12px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 表のセル・ステータスバッジ |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `500 11px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 注記・更新日時 |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 13px/1.5 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | ID・金額・数値・コード |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | 要素内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `16px` | カード・パネルの内側の余白 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `28px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `4px` | タグ・ステータスバッジ |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `8px` | 入力欄・ボタン |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `12px` | カード・ダイアログ |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | アバター・ピル |
