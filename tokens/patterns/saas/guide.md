業務 SaaS・管理画面・ダッシュボード向けの清潔感あるティール基調テーマ。落ち着いた寒色ニュートラルと明確なステータス色で、日々の業務操作を迷わず行えるようにする。

## Colors

- 作業領域に淡いクールグレーの `color.bg.canvas` を敷き、その上に白の `color.bg.default` カードを載せて情報のまとまりを作る
- `color.primary.default`（ティール）は主要アクション・アクティブタブ・選択状態に使い、成功（`color.success.*`）やエラー（`color.danger.*`）と意味が混ざらないよう使い分ける

## Typography

- 業務画面の一覧性を重視して `typography.body` はコンパクトな設計にしている
- 請求番号・金額・レコード ID など桁揃えや正確さが要る値には `typography.code` を使う

## Layout

- カード内余白は `space.md`、フォーム項目間やボタン列の間隔は `space.sm` で揃える

## Shapes

- 親しみやすさと整然さを両立するため、ボタン・入力欄は `radius.md`、カードは `radius.lg` を使う

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| 正常稼働や完了のバッジには `color.success.*` を使う | 通常の選択状態（`color.primary.*`）と成功表示を同じ色で扱う |
