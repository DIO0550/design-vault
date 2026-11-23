読み物・ドキュメント・ナレッジベース向けの温かみのある紙調テーマ。生成りの地とゆったりした行間・余白で長文の可読性を優先する。

## Colors

- 純白ではなく温かみのある `color.bg.default` と `color.bg.canvas` を使い、長文閲覧時の目の負担を抑える
- 本文には純黒ではなく焦げ茶寄りの `color.text.default` を使い、紙に印刷されたインクのような落ち着いたコントラストにする
- `color.primary.default`（テラコッタ系）はリンクや主要アクションに絞り、本文の集中を妨げない

## Typography

- 本文は `typography.body` を基本とし、1 行の長さが広がりすぎないよう配慮する
- 記事タイトルは `typography.heading-lg`、章見出しは `typography.heading-md` で明確なリズムを作る

## Layout

- 余白は他パターンより広めに取っている。章の切れ目には `space.lg`、段落やカード間には `space.md` を使う

## Shapes

- 角丸は控えめ（`radius.sm` 〜 `radius.md`）に保ち、書籍や雑誌の紙面に近い端正な印象を維持する

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 記事本文の行間と余白は `typography.body` と `space.lg` に任せる | 高密度ツールのように `space.xs` で要素を詰め込む |
