---
version: "alpha"
name: "board-dark"
description: "カンバンボード・ツリー・タイムラインを備えたタスク管理や IDE シェル向けのディープネイビー＆ブライトインディゴ調ダークテーマ。深い紺の作業領域に段階的な暗色パネルを載せ、明度を上げたアクセントと状態色で視認性を保つ。"
colors:
  bg:
    default: "#151b23"
    subtle: "#1c232e"
    canvas: "#0d1117"
    hover: "#252e3c"
    inverse: "#e6edf3"
  text:
    default: "#e6edf3"
    muted: "#9aa4b1"
    placeholder: "#7d8796"
    subtle: "#6b7785"
    disabled: "#4d5764"
    inverse: "#0d1117"
  border:
    default: "#28303c"
    subtle: "#1f2630"
    strong: "#3b4452"
  primary:
    default: "#79a1fc"
    subtle: "#1b2945"
    "on": "#0d1117"
  component:
    default: "#a78bfa"
  danger:
    default: "#ff8a82"
    subtle: "#3a1818"
    "on": "#0d1117"
  success:
    default: "#73ce95"
    subtle: "#102d1d"
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

<!-- 生成物。tokens/patterns/board-dark/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# board-dark

## Overview

カンバンボード・ツリー・タイムラインを備えたタスク管理や IDE シェル向けのディープネイビー＆ブライトインディゴ調ダークテーマ。深い紺の作業領域に段階的な暗色パネルを載せ、明度を上げたアクセントと状態色で視認性を保つ。

## Colors

- 面の階層は暗→明で単調に上げる（作業領域 `color.bg.canvas` → カード・パネル `color.bg.default` → 入力欄・補助部品 `color.bg.subtle` → ホバー `color.bg.hover`）。入力欄をパネルより暗く沈ませない
- `color.primary.default`（明るいインディゴ）はダーク面でも視認しやすい明度に統一してあるため、上の文字には必ず暗い `color.primary.on` を使う。選択行の背景には `color.primary.subtle`、文字には `color.text.default` を使う
- エラー・期限超過の `color.danger.default` と完了・正常の `color.success.default` は暗色面用に明度を上げてあり、バッジでは暗い `color.danger.subtle`・`color.success.subtle` と組で使う
- 境界線には `color.border.default` と `color.border.strong` を使い、暗色カードどうしの輪郭をはっきりさせる

## Typography

- `board` パターンと同一のタイポグラフィスケールを維持し、テーマ切り替え時にカード高さや文字折り返しが崩れないようにする
- UI の既定は `typography.body`、タスク ID やファイルパスには `typography.code` を使う

## Layout

- `board` と同じく `space.md` のカード余白と `space.sm` の要素間隔を基本にし、一覧性を損なわない密度を保つ

## Shapes

- ボタン・入力欄は `radius.md`、カードやモーダルは `radius.lg`、バッジは `radius.sm`、ステータスピルは `radius.full` を使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| ダーク面用に明度を上げた `color.primary.default` に暗い `color.primary.on` を載せる | ライト用の暗いアクセント色をダーク画面でそのまま使い続ける |
| 状態バッジは暗色用の `color.danger.subtle`・`color.success.subtle` と組で使う | ライト用の淡い背景に明るい文字を載せて視認性を落とす |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#151b23` | カード・パネル・モーダルの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#1c232e` | 入力欄・補助ボタン・浮き上がったコントロールの地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#0d1117` | ボード作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#252e3c` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#e6edf3` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#e6edf3` | 本文・タスク名・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#9aa4b1` | ラベル・件数・補足情報 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#7d8796` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#6b7785` | アイコン・開閉の印・補助メタなど。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#4d5764` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#0d1117` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#28303c` | カード境界・ペイン区切り・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#1f2630` | セクションやリスト行の淡い区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#3b4452` | ホバー時・チェックボックス・強調したい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#79a1fc` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#1b2945` | 選択中の行・アクティブ項目の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#0d1117` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#a78bfa` | コンポーネント・カテゴリ・親要素を示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#ff8a82` | エラー・期限超過・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#3a1818` | エラー・期限超過バッジの枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#0d1117` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#73ce95` | 完了・同期正常・オープンの状態表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#102d1d` | 完了・正常表示の地 |
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
