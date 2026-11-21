---
name: design-system
description: UI を実装・変更するとき（色・文字・余白・角丸を決める、CSS やスタイルを書く、コンポーネントの見た目を作る・直す）に使う。design-vault のデザイントークンとその使い分けのルールを示す。
---

# design-system

UI の見た目は、design-vault のデザイントークン（CSS 変数）だけで組み立てる。値はこのファイルに書かず、[references/tokens.md](references/tokens.md) にある。トークン名と CSS 変数名はそこで確かめる。

## 基本ルール

- 色・文字・余白・角丸は、必ず CSS 変数（`var(--color-text-default)` など）で指定する。色コードや px を直書きしない
- 当てはまるトークンがないときは、近い値を直書きして済ませない。いちばん近いトークンを使い、トークンが足りないことを利用者に伝える
- トークンは名前の意味で選ぶ。値が近いという理由で、意味の違うトークンを流用しない（例: 枠線の色に `color.text.muted` を使わない）

## 色

- 文字と地は、組で決まっている。`color.text.*` は `color.bg.*` の上、`color.primary.on` は `color.primary.default` の上、`color.danger.on` は `color.danger.default` の上で使う。この組はコントラスト比 4.5:1 以上を確かめてある。ほかの組み合わせはこの保証がない
- `color.primary.*` は主要な操作（1 画面で目立たせたい操作）とリンク、フォーカスリングに使う。装飾のためには使わない
- `color.danger.*` は削除などの破壊的な操作とエラーにだけ使う
- 区切り線や入力欄の枠は `color.border.default` を使う

## 文字

- 文字のスタイルは `typography.*` をまとめて使う（`font: var(--typography-body)`）。font-size や line-height を個別に指定しない
- `typography.heading-lg` はページの見出しで、1 画面に 1 つまで
- `typography.caption` は注記とラベル用。本文には使わない
- コードやトークン名には `typography.code` を使う

## 余白と角丸

- 余白は `space.*` の 4 段階から選ぶ。迷ったら `space.md`
- 関係が近い要素ほど間を詰める（要素内 `xs` → 関連する要素の間 `sm` → 既定 `md` → セクションの間 `lg`）
- 角丸は要素の大きさで選ぶ。小さな要素は `radius.sm`、カードとダイアログは `radius.md`、丸い形は `radius.full`

## Do / Don't

| Do | Don't |
| --- | --- |
| `color: var(--color-text-muted);` | `color: #5a6170;` |
| `padding: var(--space-md);` | `padding: 15px;` |
| `font: var(--typography-body-sm);` | `font-size: 14px; line-height: 1.6;` |
| 白抜き文字を primary の地に置くときは `color.primary.on` | 白抜き文字に `color.bg.default` を流用する |
