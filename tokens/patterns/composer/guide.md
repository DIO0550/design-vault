白いパネルとグレーの段階で組む、密度の高いデスクトップツールの外枠向けパターン。文字は IBM Plex Sans / Mono で、`typography.body` を既定にする。

## Colors

- 文字は 5 段階を役割で使い分ける。読ませる文字は `color.text.default`、ラベルや補足は `color.text.muted`、プレースホルダーと空状態の案内は `color.text.placeholder`、アイコン・開閉の印・寸法表示は `color.text.subtle`、無効な操作とショートカット表記は `color.text.disabled`
- `color.text.muted` を 4.5:1 で読めると確かめてあるのは `color.bg.default` の上だけ。`color.bg.subtle` や `color.bg.hover` の上のラベルは `color.text.default` にする
- `color.text.subtle` `color.text.disabled` `color.text.placeholder` はコントラスト比 4.5:1 に届かない。UI 案どおり補助的な表示に限って使い、操作の結果やエラーなど、読み落とすと困る情報には使わない
- `color.primary.default` は選択・アクティブ状態・フォーカスリングの色。白地の上の文字としては 4.5:1 に届かないため、文字に使うのはアクティブなタブ名やアイコンなど、位置や形でも状態が分かる箇所に限る
- 選択中の行は地を `color.primary.subtle` にし、文字は `color.text.default` のまま変えない
- `color.primary.on` は `color.primary.default` の地に載せる小さなラベル（選択中の要素名のバッジなど）だけに使う。この組も 4.5:1 に届かないため、長い文には使わない
- `color.component.default` はコンポーネントとインスタンスの目印（◆ のアイコン・名前・選択枠）に使う。それ以外の強調には使わない
- エラーは文字を `color.danger.default`、枠を `color.danger.subtle` にする。地を赤で塗るのは破壊的な操作のボタンだけ
- 面の重なりは、作業領域 `color.bg.canvas` → パネル `color.bg.default` → 入力欄 `color.bg.subtle` の順に明るさで分ける。パネルの境界は `color.border.default`、パネル内のセクションの区切りは `color.border.subtle`

## Typography

- 既定は `typography.body`。行・入力値・ボタンの文字はすべてこれにそろえる
- パネルの見出しは `typography.heading-md`、プロパティ群の見出しは `typography.label`
- `typography.heading-lg` はダイアログと空状態の見出しだけに使う
- `typography.caption` は左端のレールのラベルなど、決まった短い語だけに使う
- トークン名・数値・コードは `typography.code` にする

## Layout

- パネルの左右の余白は `space.md`、行の中の要素の間は `space.sm`、アイコンと印の間は `space.2xs`

## Shapes

- 入力欄・ボタン・行の選択枠の角丸は `radius.md`、メニューやポップオーバーは `radius.lg`、バッジは `radius.sm`

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 選択中の行の地を `color.primary.subtle`、文字は `color.text.default` | 選択中の行の文字を `color.primary.default` にする |
| コンポーネントのアイコンと名前に `color.component.default` | 目立たせたいボタンに `color.component.default` を使う |
| エラー文に `color.danger.default` | エラー文に `color.text.subtle` を使って控えめにする |
