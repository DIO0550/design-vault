カンバンボード・ツリー・タイムラインを備えたタスク管理や IDE シェル向けのディープネイビー＆ブライトインディゴ調ダークテーマ。深い紺の作業領域に段階的な暗色パネルを載せ、明度を上げたアクセントと状態色で視認性を保つ。

## Colors

- 面の階層は暗→明で単調に上げる（作業領域 `color.bg.canvas` → カード・パネル `color.bg.default` → 入力欄・補助部品 `color.bg.subtle` → ホバー `color.bg.hover`）。入力欄をパネルより暗く沈ませない
- `color.primary.default`（明るいインディゴ）はダーク面でも視認しやすい明度に統一してあるため、上の文字には必ず暗い `color.primary.on` を使う。選択行の背景には `color.primary.subtle`、文字には `color.text.default` を使う
- エラー・期限超過の `color.danger.default` と完了・正常の `color.success.default` は暗色面用に明度を上げてあり、バッジでは暗い `color.danger.subtle`・`color.success.subtle` と組で使う
- 境界線には `color.border.default` と `color.border.strong` を使い、暗色カードどうしの輪郭をはっきりさせる

## Typography

- `slate` パターンと同一のタイポグラフィスケールを維持し、テーマ切り替え時にカード高さや文字折り返しが崩れないようにする
- UI の既定は `typography.body`、タスク ID やファイルパスには `typography.code` を使う

## Layout

- `slate` と同じく `space.md` のカード余白と `space.sm` の要素間隔を基本にし、一覧性を損なわない密度を保つ

## Shapes

- ボタン・入力欄は `radius.md`、カードやモーダルは `radius.lg`、バッジは `radius.sm`、ステータスピルは `radius.full` を使う

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| ダーク面用に明度を上げた `color.primary.default` に暗い `color.primary.on` を載せる | ライト用の暗いアクセント色をダーク画面でそのまま使い続ける |
| 状態バッジは暗色用の `color.danger.subtle`・`color.success.subtle` と組で使う | ライト用の淡い背景に明るい文字を載せて視認性を落とす |
