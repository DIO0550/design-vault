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

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| `color.primary.default` の上の文字やアイコンに暗い `color.primary.on` を使う | 明るいペリウィンクル背景の上に白文字を直書きしてコントラストを落とす |
| 暗色面の階層は `color.bg.canvas`・`color.bg.default`・`color.bg.subtle` で切り替える | 暗色パネルに白を合成して不自然なグレーを作る |
