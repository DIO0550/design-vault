監視パネル・CLI ツール・ログビューア向けのアンバー発光ダークテーマ。等幅書体とシャープな角丸、温かみのある暗色背景で計測器のような視認性を提供する。

## Colors

- 主要アクションの `color.primary.default` は視認性の高いアンバー（明るい色）のため、上の文字には必ず暗い `color.primary.on` を使う
- 漆黒に近い `color.bg.canvas` の上に `color.bg.default` パネルを置き、`color.border.default` の細い枠線で区画する

## Typography

- UI 全体に等幅書体（`font.family.sans` も等幅を先頭に指定）を使い、数値・ログ・タイムスタンプの縦の揃いを保つ

## Layout

- 情報密度を高めに保ちつつ、`space.sm` と `space.md` でパネル内の行間を明確にする

## Shapes

- ハードウェア計器に近いシャープな印象を保つため、角丸は `radius.sm` と `radius.md` を中心に使う

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| アンバー（`color.primary.default`）の上の文字には暗い `color.primary.on` を使う | アンバーの上に白文字を載せてコントラストを落とす |
