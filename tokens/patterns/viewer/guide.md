仕様書・ドキュメント閲覧や差分レビュー向けの温かみあるストーン調ライトテーマ。無彩色の紙面に近い落ち着いた背景に鮮やかなブルーのアクセントを合わせ、複数ペインをまたいだ長時間の閲覧とレビューを快適にする。

## Colors

- ニュートラルは温かみのあるストーン系で統一し、クールグレーを混ぜない。面の階層は作業領域 `color.bg.canvas` → サイドバー・入力欄 `color.bg.subtle` → 本文閲覧ペイン・カード `color.bg.default` の順に明度差で分ける
- 文字は 5 段階を役割で使い分ける。読ませる本文・見出しは `color.text.default`、ラベルやメタ情報は `color.text.muted`、プレースホルダーは `color.text.placeholder`、補助アイコンは `color.text.subtle`、無効状態は `color.text.disabled`
- `color.text.default` と `color.text.muted` は `color.bg.default`・`color.bg.subtle`・`color.bg.hover` のいずれの上でもコントラスト比 4.5:1 以上を確かめてある
- `color.primary.default` はアクティブタブ・選択状態・主要操作・フォーカスリングに使う。選択行の背景には淡い `color.primary.subtle` を敷き、文字は `color.text.default` のまま保つ
- 削除・エラーの `color.danger.default` は `color.bg.default` と `color.danger.subtle` の両方の上で 4.5:1 以上を確保している。追加・解決済みの表示には `color.success.default` と `color.success.subtle` の組を使う
- 注釈や特殊種別の目印には `color.component.default` を使い、通常の選択状態（`color.primary.*`）と混同させない

## Typography

- アプリ外枠の UI（ツリー・ツールバー・コメント一覧）の既定は `typography.body`、ドキュメント本文の閲覧にはゆったりした `typography.body-lg` を使う
- ペインの見出しは `typography.heading-md`、グループやフォームの見出しは `typography.label`、ファイルパス・差分・コードには `typography.code` を使う
- ウェイトやサイズはトークンに揃えた段階だけを使い、場当たり的な中間値を増やさない

## Layout

- 複数ペインの画面でも圧迫感が出ないよう、ペイン内余白は `space.md`、要素間は `space.sm`、セクションの区切りは `space.lg` を基本にする

## Shapes

- ボタン・入力欄・タブには柔らかな `radius.md`、ポップオーバーやカードには `radius.lg`、バッジには `radius.sm` を使う

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| サイドバー（`color.bg.subtle`）と本文ペイン（`color.bg.default`）を明度差と `color.border.default` で分ける | キャンバス・サイドバー・本文ペインをすべて同じ背景色にして階層を潰す |
| 危険操作やエラー通知に `color.danger.default` と `color.danger.subtle` の組を使う | 視認性が落ちる薄い赤を淡い赤背景の上に載せる |
| ドキュメント本文に `typography.body-lg`、UI 操作部に `typography.body` を使い分ける | ペインごとに細かな文字サイズを個別に直書きする |
