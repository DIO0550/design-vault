---
version: "alpha"
name: "board"
description: "カンバンボード・ツリー・タイムラインを備えたタスク管理や IDE シェル向けのクールスレート＆インディゴ調ライトテーマ。淡い寒色の作業領域に白のカードを整理し、彩度を抑えたインディゴのアクセントで一覧性と集中力を両立する。"
colors:
  bg:
    default: "#ffffff"
    subtle: "#f6f7fa"
    canvas: "#f3f5f8"
    hover: "#eceff5"
    inverse: "#1f2328"
  text:
    default: "#1f2328"
    muted: "#59626e"
    placeholder: "#757f8c"
    subtle: "#8a94a2"
    disabled: "#adb5c0"
    inverse: "#ffffff"
  border:
    default: "#e3e5eb"
    subtle: "#eef0f4"
    strong: "#d4d7df"
  primary:
    default: "#466abf"
    subtle: "#e9f0ff"
    "on": "#ffffff"
  component:
    default: "#7c3aed"
  danger:
    default: "#b32228"
    subtle: "#ffe8e5"
    "on": "#ffffff"
  success:
    default: "#156f3c"
    subtle: "#dff5e7"
typography:
  heading-lg:
    fontFamily: "Inter"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
  heading-md:
    fontFamily: "Inter"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "Inter"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Inter"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "Inter"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.35
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
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
  md: "12px"
  lg: "24px"
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

<!-- 生成物。tokens/patterns/board/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# board

## Overview

カンバンボード・ツリー・タイムラインを備えたタスク管理や IDE シェル向けのクールスレート＆インディゴ調ライトテーマ。淡い寒色の作業領域に白のカードを整理し、彩度を抑えたインディゴのアクセントで一覧性と集中力を両立する。

## Colors

- 面の階層は作業領域 `color.bg.canvas` → サイドバー・入力欄 `color.bg.subtle` → カード・パネル `color.bg.default` の 3 段と、操作時の `color.bg.hover` で明確に描き分ける
- `color.primary.default`（インディゴ）は主要アクション・アクティブビュー・フォーカスリングに統一し、画面ごとに別名のアクセントを増やさない。選択行は `color.primary.subtle` に `color.text.default` を載せる
- エラー・期限超過には `color.danger.default` と `color.danger.subtle`、完了・正常には `color.success.default` と `color.success.subtle` を使う。いずれも `color.bg.default` 上と `subtle` 地上の両方でコントラスト比 4.5:1 以上を確保している
- `color.text.default` と `color.text.muted` は `color.bg.default`・`color.bg.subtle`・`color.bg.hover` のいずれの上でも 4.5:1 以上を満たす

## Typography

- UI の既定は `typography.body` に一本化し、ルート基準と本文基準のずれを作らない
- カラムやパネルの見出しは `typography.heading-md`、サイドバーのグループ見出しやフォームラベルは `typography.label` を使う
- タスク ID・件数・ファイルパス・フロントマターなど等幅で揃えたい要素には `typography.code` を使う

## Layout

- 多くのカードやツリー行を一覧できるよう、カード内余白は `space.md`、要素間は `space.sm` を基本にしたコンパクトなリズムで組む

## Shapes

- ボタン・入力欄・選択行には引き締まった `radius.md`、カードやモーダルには `radius.lg`、ステータスバッジには `radius.sm`、同期インジケータなどのピルには `radius.full` を使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| エラー・完了などの状態色に `color.danger.*` や `color.success.*` を使う | 状態色だけフレームワーク既定の赤や緑のクラスを直書きする |
| ホバー時の背景に専用の `color.bg.hover` を使う | `color.bg.default` と見分けがつかない近似色を使い回す |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#ffffff` | カード・パネル・モーダルの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#f6f7fa` | サイドバー・入力欄・補助ボタンの地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#f3f5f8` | ボード作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#eceff5` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#1f2328` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#1f2328` | 本文・タスク名・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#59626e` | ラベル・件数・補足情報 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#757f8c` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#8a94a2` | アイコン・開閉の印・補助メタなど。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#adb5c0` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#ffffff` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#e3e5eb` | カード境界・ペイン区切り・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#eef0f4` | セクションやリスト行の淡い区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#d4d7df` | ホバー時・チェックボックス・強調したい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#466abf` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#e9f0ff` | 選択中の行・アクティブ項目の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#7c3aed` | コンポーネント・カテゴリ・親要素を示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#b32228` | エラー・期限超過・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#ffe8e5` | エラー・期限超過バッジの枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#156f3c` | 完了・同期正常・オープンの状態表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#dff5e7` | 完了・正常表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | タスク ID・ファイルパス・コード |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 22px/1.3 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | 画面・詳細ビューの見出し |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 15px/1.4 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | カラム・パネル・ダイアログの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 12px/1.4 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | サイドバーのグループ見出し・フォームラベル |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 15px/1.55 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | 詳細画面の本文・やや大きく読ませたい説明 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 14px/1.5 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | UI の既定の文字（カード・ツリー・ボタン・入力値） |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 12px/1.45 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | バッジ・メタ情報・コンパクトな一覧行 |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `500 11px/1.35 Inter, 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif` | 件数カウント・キーボードヒント・補助注記 |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 12px/1.5 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | タスク ID・ファイルパス・フロントマター |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | アイコンと印の間など密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | バッジ内や行内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | カード内やボタン列など関連要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `12px` | パネル・カードの内側の余白・既定の間隔 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `24px` | セクション・カラム群どうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `4px` | ラベル・ステータスバッジ・小さなアイコンボタン |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `6px` | ボタン・入力欄・タブ・選択行 |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `10px` | カード・パネル・モーダル |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | 同期ピル・アバター・ステータスドット |
