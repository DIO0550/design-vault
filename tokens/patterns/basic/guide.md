汎用の明るいテーマ。特定のプロダクトに寄せず、読みやすさを優先した仮のパターン。

## 色

- 文字と地は、組で決まっている。`color.text.*` は `color.bg.*` の上、`color.primary.on` は `color.primary.default` の上、`color.danger.on` は `color.danger.default` の上で使う。この組はコントラスト比 4.5:1 以上を確かめてある
- `color.primary.*` は主要な操作（1 画面で目立たせたい操作）とリンク、フォーカスリングに使う。装飾のためには使わない
- `color.danger.*` は削除などの破壊的な操作とエラーにだけ使う
- 区切り線や入力欄の枠は `color.border.default` を使う

## 文字

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
| 白抜き文字を primary の地に置くときは `color.primary.on` | 白抜き文字に `color.bg.default` を流用する |
