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

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| エラー・完了などの状態色に `color.danger.*` や `color.success.*` を使う | 状態色だけフレームワーク既定の赤や緑のクラスを直書きする |
| ホバー時の背景に専用の `color.bg.hover` を使う | `color.bg.default` と見分けがつかない近似色を使い回す |
