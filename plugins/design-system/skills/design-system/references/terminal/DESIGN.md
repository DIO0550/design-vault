---
version: "alpha"
name: "terminal"
description: "監視パネル・CLI ツール・ログビューア向けのアンバー発光ダークテーマ。等幅書体とシャープな角丸、温かみのある暗色背景で計測器のような視認性を提供する。"
colors:
  bg:
    default: "#141413"
    subtle: "#1d1c1a"
    canvas: "#0c0c0b"
    hover: "#262521"
    inverse: "#f3f1ea"
  text:
    default: "#f3f1ea"
    muted: "#a19c8e"
    placeholder: "#7d796d"
    subtle: "#706c61"
    disabled: "#4a4840"
    inverse: "#141413"
  border:
    default: "#2e2c26"
    subtle: "#22211c"
    strong: "#4a473e"
  primary:
    default: "#f59e0b"
    subtle: "#332610"
    "on": "#141413"
  component:
    default: "#c084fc"
  danger:
    default: "#f87171"
    subtle: "#361818"
    "on": "#141413"
  success:
    default: "#4ade80"
    subtle: "#132d1c"
typography:
  heading-lg:
    fontFamily: "JetBrains Mono"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.3
  heading-md:
    fontFamily: "JetBrains Mono"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "JetBrains Mono"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "JetBrains Mono"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "JetBrains Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "JetBrains Mono"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "JetBrains Mono"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.35
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
  md: "14px"
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

<!-- 生成物。tokens/patterns/terminal/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# terminal

## Overview

監視パネル・CLI ツール・ログビューア向けのアンバー発光ダークテーマ。等幅書体とシャープな角丸、温かみのある暗色背景で計測器のような視認性を提供する。

## Colors

- 主要アクションの `color.primary.default` は視認性の高いアンバー（明るい色）のため、上の文字には必ず暗い `color.primary.on` を使う
- 漆黒に近い `color.bg.canvas` の上に `color.bg.default` パネルを置き、`color.border.default` の細い枠線で区画する

## Typography

- UI 全体に等幅書体（`font.family.sans` も等幅を先頭に指定）を使い、数値・ログ・タイムスタンプの縦の揃いを保つ

## Layout

- 情報密度を高めに保ちつつ、`space.sm` と `space.md` でパネル内の行間を明確にする

## Shapes

- ハードウェア計器に近いシャープな印象を保つため、角丸は `radius.sm` と `radius.md` を中心に使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| アンバー（`color.primary.default`）の上の文字には暗い `color.primary.on` を使う | アンバーの上に白文字を載せてコントラストを落とす |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#141413` | パネルとカードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#1d1c1a` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#0c0c0b` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#262521` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#f3f1ea` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#f3f1ea` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#a19c8e` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#7d796d` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#706c61` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#4a4840` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#141413` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#2e2c26` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#22211c` | セクションの区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#4a473e` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#f59e0b` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#332610` | 選択中の行の地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#141413` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#c084fc` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#f87171` | エラー・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#361818` | エラー表示の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#141413` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#4ade80` | 成功・正常の表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#132d1c` | 成功表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | UI と本文（等幅主体） |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | ログ・数値・コマンド |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 22px/1.3 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | 画面タイトル |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 15px/1.4 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | パネル・セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 11px/1.4 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | フィールドラベル・メトリクス名 |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 14px/1.55 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | 説明文・やや大きな表示 |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 13px/1.5 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | UI とログの既定 |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 11px/1.45 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | ステータスバッジ・タイムスタンプ |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `500 10px/1.35 'JetBrains Mono', 'IBM Plex Mono', 'Hiragino Sans', 'Noto Sans JP', monospace` | 最小の注記・キーバインド表記 |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 13px/1.5 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コマンド・ログ出力 |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | 密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | 要素内の最小の隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `spacing.md` | `var(--space-md)` | `14px` | パネル内余白・既定の間隔 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `24px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `2px` | バッジ・ステータス印 |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `4px` | 入力欄・ボタン |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `6px` | パネル・ダイアログ |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | インジケータドット・ピル |
