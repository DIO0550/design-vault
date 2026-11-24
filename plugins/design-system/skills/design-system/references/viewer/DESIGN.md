---
version: "alpha"
name: "viewer"
description: "仕様書・ドキュメント閲覧や差分レビュー向けの温かみあるストーン調ライトテーマ。無彩色の紙面に近い落ち着いた背景に鮮やかなブルーのアクセントを合わせ、複数ペインをまたいだ長時間の閲覧とレビューを快適にする。"
colors:
  bg:
    default: "#ffffff"
    subtle: "#fafaf9"
    canvas: "#f3f2ef"
    hover: "#efede9"
    inverse: "#1c1917"
  text:
    default: "#1c1917"
    muted: "#57534e"
    placeholder: "#78716c"
    subtle: "#8c857d"
    disabled: "#b5afa8"
    inverse: "#ffffff"
  border:
    default: "#e7e5e4"
    subtle: "#f0eeeb"
    strong: "#d6d3d1"
  primary:
    default: "#2563eb"
    subtle: "#eff6ff"
    "on": "#ffffff"
  component:
    default: "#725aa8"
  danger:
    default: "#b91c1c"
    subtle: "#fee2e2"
    "on": "#ffffff"
  success:
    default: "#15803d"
    subtle: "#dcfce7"
typography:
  heading-lg:
    fontFamily: "system-ui"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
  heading-md:
    fontFamily: "system-ui"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
  label:
    fontFamily: "system-ui"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "system-ui"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "system-ui"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "system-ui"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: "system-ui"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.35
  code:
    fontFamily: "JetBrains Mono"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "7px"
  lg: "10px"
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

<!-- 生成物。tokens/patterns/viewer/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# viewer

## Overview

仕様書・ドキュメント閲覧や差分レビュー向けの温かみあるストーン調ライトテーマ。無彩色の紙面に近い落ち着いた背景に鮮やかなブルーのアクセントを合わせ、複数ペインをまたいだ長時間の閲覧とレビューを快適にする。

## Colors

- ニュートラルは温かみのあるストーン系で統一し、クールグレーを混ぜない。面の階層は作業領域 `color.bg.canvas` → サイドバー・入力欄 `color.bg.subtle` → 本文閲覧ペイン・カード `color.bg.default` の順に明度差で分ける
- 文字は 5 段階を役割で使い分ける。読ませる本文・見出しは `color.text.default`、ラベルやメタ情報は `color.text.muted`、プレースホルダーは `color.text.placeholder`、補助アイコンは `color.text.subtle`、無効状態は `color.text.disabled`
- `color.text.default` と `color.text.muted` は `color.bg.default`・`color.bg.subtle`・`color.bg.hover` のいずれの上でもコントラスト比 4.5:1 以上を確かめてある
- `color.primary.default` はアクティブタブ・選択状態・主要操作・フォーカスリングに使う。選択行の背景には淡い `color.primary.subtle` を敷き、文字は `color.text.default` のまま保つ
- 削除・エラーの `color.danger.default` は `color.bg.default` と `color.danger.subtle` の両方の上で 4.5:1 以上を確保している。追加・解決済みの表示には `color.success.default` と `color.success.subtle` の組を使う
- 注釈や特殊種別の目印には `color.component.default` を使い、通常の選択状態（`color.primary.*`）と混同させない

## Typography

- アプリ外枠の UI（ツリー・ツールバー・コメント一覧）の既定は `typography.body`、ドキュメント本文の閲覧にはゆったりした `typography.body-lg` を使う
- ペインの見出しは `typography.heading-md`、グループやフォームの見出しは `typography.label`、ファイルパス・差分・コードには `typography.code` を使う
- ウェイトやサイズはトークンに揃えた段階だけを使い、場当たり的な中間値を増やさない

## Layout

- 複数ペインの画面でも圧迫感が出ないよう、ペイン内余白は `space.md`、要素間は `space.sm`、セクションの区切りは `space.lg` を基本にする

## Shapes

- ボタン・入力欄・タブには柔らかな `radius.md`、ポップオーバーやカードには `radius.lg`、バッジには `radius.sm` を使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| サイドバー（`color.bg.subtle`）と本文ペイン（`color.bg.default`）を明度差と `color.border.default` で分ける | キャンバス・サイドバー・本文ペインをすべて同じ背景色にして階層を潰す |
| 危険操作やエラー通知に `color.danger.default` と `color.danger.subtle` の組を使う | 視認性が落ちる薄い赤を淡い赤背景の上に載せる |
| ドキュメント本文に `typography.body-lg`、UI 操作部に `typography.body` を使い分ける | ペインごとに細かな文字サイズを個別に直書きする |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#ffffff` | 本文閲覧ペイン・パネル・カードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#fafaf9` | サイドバー・入力欄・補助コントロールの地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#f3f2ef` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#efede9` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#1c1917` | ツールチップ・コードブロックなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#1c1917` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#57534e` | ラベル・メタ情報・補足文 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#78716c` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#8c857d` | アイコン・開閉の印・パス区切りなど補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#b5afa8` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#ffffff` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#e7e5e4` | ペイン境界・入力欄・カードの枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#f0eeeb` | セクションやコメント間の区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#d6d3d1` | セカンダリボタン・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#2563eb` | 選択・アクティブタブ・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#eff6ff` | 選択中の行やハイライトの地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#725aa8` | コンポーネント・注釈・特殊種別を示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#b91c1c` | エラー・削除・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#fee2e2` | エラー表示・削除行の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#15803d` | 成功・追加・解決済みの表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#dcfce7` | 成功・追加表示の地 |
| `font.family.sans` | `font.family.sans` | `var(--font-family-sans)` | `system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | UI と本文 |
| `font.family.mono` | `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・差分・ファイルパス |
| `typography.heading-lg` | `typography.heading-lg` | `var(--typography-heading-lg)` | `700 24px/1.3 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | 文書タイトル・空状態の見出し |
| `typography.heading-md` | `typography.heading-md` | `var(--typography-heading-md)` | `600 16px/1.4 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | ペイン・セクションの見出し |
| `typography.label` | `typography.label` | `var(--typography-label)` | `600 12px/1.4 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | ツリー見出し・ツールバーのラベル・強調したい行 |
| `typography.body-lg` | `typography.body-lg` | `var(--typography-body-lg)` | `400 16px/1.65 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | Markdown 本文など長文の閲覧テキスト |
| `typography.body` | `typography.body` | `var(--typography-body)` | `400 13px/1.5 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | UI の既定の文字（ナビゲーション・入力値・ボタン・コメント） |
| `typography.body-sm` | `typography.body-sm` | `var(--typography-body-sm)` | `400 12px/1.45 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | メタ情報・バッジ・補助説明 |
| `typography.caption` | `typography.caption` | `var(--typography-caption)` | `500 11px/1.35 system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', 'Segoe UI', sans-serif` | パスバー・タイムスタンプなど最小の注記。本文には使わない |
| `typography.code` | `typography.code` | `var(--typography-code)` | `400 13px/1.5 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・差分行・ファイルパス |
| `space.2xs` | `spacing.2xs` | `var(--space-2xs)` | `2px` | アイコンと印の間など密着させたい隙間 |
| `space.xs` | `spacing.xs` | `var(--space-xs)` | `4px` | 要素内の小さな隙間 |
| `space.sm` | `spacing.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間・リスト行内の間隔 |
| `space.md` | `spacing.md` | `var(--space-md)` | `14px` | ペインやカードの内側の余白・既定の間隔 |
| `space.lg` | `spacing.lg` | `var(--space-lg)` | `24px` | セクションどうしの間 |
| `radius.sm` | `rounded.sm` | `var(--radius-sm)` | `4px` | タグ・バッジ・小さな印 |
| `radius.md` | `rounded.md` | `var(--radius-md)` | `7px` | 入力欄・ボタン・タブ・選択行 |
| `radius.lg` | `rounded.lg` | `var(--radius-lg)` | `10px` | ポップオーバー・ダイアログ・カード |
| `radius.full` | `rounded.full` | `var(--radius-full)` | `9999px` | 丸ボタン・ピル・ステータスドット |
