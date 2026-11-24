---
version: "alpha"
name: "viewer-dark"
description: "仕様書・ドキュメント閲覧や差分レビュー向けのクールスレート＆ペリウィンクル調ダークテーマ。彩度を抑えた青みのある暗色面と柔らかなパステル調の状態色で、夜間の長時間レビューでも目の負担を軽減する。"
colors:
  bg:
    default: "#1e212a"
    subtle: "#252936"
    canvas: "#151820"
    hover: "#2f3442"
    inverse: "#f6f7f8"
  text:
    default: "#f6f7f8"
    muted: "#b8bfcc"
    placeholder: "#8f98aa"
    subtle: "#7c8599"
    disabled: "#586070"
    inverse: "#111216"
  border:
    default: "#3d4250"
    subtle: "#2b303c"
    strong: "#596175"
  primary:
    default: "#9daaff"
    subtle: "#26305f"
    "on": "#111216"
  component:
    default: "#c5a2ef"
  danger:
    default: "#efa18f"
    subtle: "#3c2521"
    "on": "#111216"
  success:
    default: "#88d39d"
    subtle: "#203c2b"
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

<!-- 生成物。tokens/patterns/viewer-dark/ の tokens.json と guide.md、tokens/components.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# viewer-dark

## Overview

仕様書・ドキュメント閲覧や差分レビュー向けのクールスレート＆ペリウィンクル調ダークテーマ。彩度を抑えた青みのある暗色面と柔らかなパステル調の状態色で、夜間の長時間レビューでも目の負担を軽減する。

## Colors

- 面の階層は暗→明で表現する（作業領域 `color.bg.canvas` → パネル・閲覧面 `color.bg.default` → 入力欄・操作部品 `color.bg.subtle` → ホバー `color.bg.hover`）。暗色面に白を混ぜて白濁させず、定義済みの面トークンだけで階層を組む
- 主要アクションの `color.primary.default`（明るいペリウィンクル）とエラーの `color.danger.default`（コーラル）はいずれも明度が高いため、上に載せる文字やアイコンには必ず暗い `color.primary.on`・`color.danger.on` を使う
- 選択行の背景には深い藍色の `color.primary.subtle` を使い、文字は `color.text.default` のまま保つ
- `color.text.default` と `color.text.muted` は `color.bg.default`・`color.bg.subtle`・`color.bg.hover` のすべての上でコントラスト比 4.5:1 以上を確かめてある
- 成功表示は `color.success.default` と `color.success.subtle`、エラー表示は `color.danger.default` と `color.danger.subtle` を組で使う

## Typography

- `viewer` パターンと同一のタイポグラフィスケールを保ち、ライト・ダーク切り替え時にレイアウトがずれないようにする
- UI の既定は `typography.body`、長文のドキュメント本文は `typography.body-lg`、コードや差分は `typography.code` を使う

## Layout

- ペイン内余白は `space.md`、要素間は `space.sm`、セクション間は `space.lg` を基本にし、暗色面でも情報のまとまりを明快に保つ

## Shapes

- ボタン・入力欄・タブには `radius.md`、カードやポップオーバーには `radius.lg`、バッジには `radius.sm` を使う

## Components

部品の各部分に使うトークンは front matter の `components` にある（キー名は部品と状態。例: `button-primary`、`list-row-selected`）。全パターン共通で、部品ごとの細かな使い分けはスキルの `references/components.md` に書いてある。

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| `color.primary.default` の上の文字やアイコンに暗い `color.primary.on` を使う | 明るいペリウィンクル背景の上に白文字を直書きしてコントラストを落とす |
| 暗色面の階層は `color.bg.canvas`・`color.bg.default`・`color.bg.subtle` で切り替える | 暗色パネルに白を合成して不自然なグレーを作る |

## Implementation

実装では CSS 変数を使い、値を直書きしない。本文のトークン名（`color.text.default` の形）は正本 tokens.json の名前で、front matter では DESIGN.md の仕様に合わせて `colors` `spacing` `rounded` の下に置いている。

| トークン | front matter | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- | --- |
| `color.bg.default` | `colors.bg.default` | `var(--color-bg-default)` | `#1e212a` | 本文閲覧ペイン・パネル・カードの地 |
| `color.bg.subtle` | `colors.bg.subtle` | `var(--color-bg-subtle)` | `#252936` | 入力欄・小さな操作部品・浮き上がったコントロールの地 |
| `color.bg.canvas` | `colors.bg.canvas` | `var(--color-bg-canvas)` | `#151820` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `colors.bg.hover` | `var(--color-bg-hover)` | `#2f3442` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `colors.bg.inverse` | `var(--color-bg-inverse)` | `#f6f7f8` | ツールチップなど反転した面の地 |
| `color.text.default` | `colors.text.default` | `var(--color-text-default)` | `#f6f7f8` | 本文・見出し・値 |
| `color.text.muted` | `colors.text.muted` | `var(--color-text-muted)` | `#b8bfcc` | ラベル・メタ情報・補足文 |
| `color.text.placeholder` | `colors.text.placeholder` | `var(--color-text-placeholder)` | `#8f98aa` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `colors.text.subtle` | `var(--color-text-subtle)` | `#7c8599` | アイコン・開閉の印・パス区切りなど補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `colors.text.disabled` | `var(--color-text-disabled)` | `#586070` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `colors.text.inverse` | `var(--color-text-inverse)` | `#111216` | bg.inverse の上の文字 |
| `color.border.default` | `colors.border.default` | `var(--color-border-default)` | `#3d4250` | ペイン境界・入力欄・カードの枠 |
| `color.border.subtle` | `colors.border.subtle` | `var(--color-border-subtle)` | `#2b303c` | セクションやコメント間の区切り線 |
| `color.border.strong` | `colors.border.strong` | `var(--color-border-strong)` | `#596175` | セカンダリボタン・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `colors.primary.default` | `var(--color-primary-default)` | `#9daaff` | 選択・アクティブタブ・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `colors.primary.subtle` | `var(--color-primary-subtle)` | `#26305f` | 選択中の行やハイライトの地 |
| `color.primary.on` | `colors.primary.on` | `var(--color-primary-on)` | `#111216` | primary.default の上の文字やアイコン |
| `color.component.default` | `colors.component.default` | `var(--color-component-default)` | `#c5a2ef` | コンポーネント・注釈・特殊種別を示す色（アイコン・名前・枠） |
| `color.danger.default` | `colors.danger.default` | `var(--color-danger-default)` | `#efa18f` | エラー・削除・破壊的な操作 |
| `color.danger.subtle` | `colors.danger.subtle` | `var(--color-danger-subtle)` | `#3c2521` | エラー表示・削除行の枠・地 |
| `color.danger.on` | `colors.danger.on` | `var(--color-danger-on)` | `#111216` | danger.default の上の文字 |
| `color.success.default` | `colors.success.default` | `var(--color-success-default)` | `#88d39d` | 成功・追加・解決済みの表示 |
| `color.success.subtle` | `colors.success.subtle` | `var(--color-success-subtle)` | `#203c2b` | 成功・追加表示の地 |
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
