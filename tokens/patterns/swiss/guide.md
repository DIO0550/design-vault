無彩色とシャープな罫線で構成するミニマルなモノクロームテーマ。装飾色を使わず、タイポグラフィの重みと余白、黒のアクセントだけで情報を整理する。

## Colors

- 主要な操作（`color.primary.default`）も黒で統一し、画面内に不要な有彩色を増やさない
- 有彩色はエラー（`color.danger.*`）と成功（`color.success.*`）の意味的状態にだけ残す
- 強調したい枠線には `color.border.strong`（黒）を使い、通常の区切り `color.border.default` と明確に差別化する

## Typography

- 見出しは太さとサイズ差で階層を示し、色分けに頼らない
- 数値・コード・メタデータには `typography.code` を使い、整列感を高める

## Layout

- グリッドと余白（`space.md` / `space.lg`）を揃え、要素の端を一直線に合わせる

## Shapes

- 角丸は最小限（`radius.sm` 2px、`radius.md` 4px）に抑え、直線的で硬質な印象を保つ

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 主要ボタンは `color.primary.default`（黒）と `color.primary.on`（白）の反転で目立たせる | 装飾のためにブランドカラーやグラデーションを足す |
