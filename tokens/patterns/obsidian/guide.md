開発者コンソール・ダークモードアプリ向けの高コントラスト暗色テーマ。長時間の作業でも眩しさを抑え、境界線と面の明度差で階層を伝える。

## Colors

- 面の階層は暗→明で表現する（作業領域 `color.bg.canvas` → カード・パネル `color.bg.default` → 入力欄 `color.bg.subtle` → ホバー `color.bg.hover`）
- 暗色背景で影が目立ちにくいため、面どうしの区切りには `color.border.default` と `color.border.subtle` を明確に使う
- `color.primary.default` は主要な操作とフォーカスリングに限定し、選択行の地には彩度を抑えた `color.primary.subtle` を使う
- エラー表示は `color.danger.default`（明るい赤）を文字と枠に使い、地には暗い `color.danger.subtle` を合わせる

## Typography

- UI の既定は `typography.body`（14px）。テーブルやインスペクタは `typography.body-sm` を使う
- コマンド・ID・ログ・数値には `typography.code` を使い、視認性を揃える

## Layout

- パネル内余白は `space.md`、関連要素どうしは `space.sm` を基本にし、情報密度と余白のバランスを保つ

## Shapes

- ボタン・入力欄は引き締まった `radius.md`、カードやモーダルは `radius.lg` を使う

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 暗色背景で階層を示すときは `color.bg.canvas` と `color.bg.default` の明度差と `color.border.default` を使う | 強いドロップシャドウだけで面を分けようとする |
| 選択行の背景には `color.primary.subtle` を使い文字は `color.text.default` のままにする | 選択行に `color.primary.default` を広く敷き詰める |
