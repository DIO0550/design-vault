# コンポーネント

部品ごとに、どの部分にどのトークンを使うかを決める。トークン名は全パターンで共通なので、この表はパターンに依らない。値と、パターン固有の使い分けは `references/<パターン>/DESIGN.md` を見る。

見本ページ（https://dio0550.github.io/design-vault/）の「コンポーネント」に、同じ割り当てで組んだ見本がある。

## ボタン

| 部分 | トークン |
| --- | --- |
| 文字 | `typography.body` |
| 主要（1 画面で最も押してほしい操作。1 つまで） | 地と枠 `color.primary.default`、文字 `color.primary.on` |
| 通常 | 地 `color.bg.default`、枠 `color.border.default`、文字 `color.text.default` |
| 破壊的（削除など） | 通常と同じ地と枠に、文字 `color.danger.default` |
| 控えめ（補助の操作） | 枠なし、文字 `color.text.muted` |
| hover | 地 `color.bg.hover`（主要のボタンは変えない） |
| 無効 | 地 `color.bg.subtle`、枠 `color.border.subtle`、文字 `color.text.disabled` |
| 角丸・余白 | `radius.md`、上下 `space.xs`・左右 `space.md` |
| フォーカス | `color.primary.default` の outline |

- 破壊的な操作を主要のボタンにしない。確認を挟み、確認側のボタンだけを強調する

## 入力欄

| 部分 | トークン |
| --- | --- |
| ラベル | `typography.label`、`color.text.muted` |
| 入力欄 | `typography.body`、地 `color.bg.subtle`、枠 `color.border.default`、`radius.md` |
| プレースホルダー | `color.text.placeholder` |
| フォーカス | `color.primary.default` の outline |
| エラー | 枠と、入力欄の下のメッセージに `color.danger.default`（メッセージは `typography.body-sm`） |
| 無効 | 文字 `color.text.disabled` |

- エラーは色だけで伝えない。必ずメッセージを添える

## リストの行（レイヤー・ツリー・メニュー）

| 部分 | トークン |
| --- | --- |
| 名前 | `typography.body`、`color.text.default` |
| アイコン・開閉の印・寸法などの付記 | `color.text.subtle` |
| hover | 地 `color.bg.hover` |
| 選択中 | 地 `color.primary.subtle`。文字の色は変えない |
| コンポーネント・インスタンス | アイコンと名前を `color.component.default` |
| 角丸・余白 | `radius.md`、上下 `space.xs`・左右 `space.sm`、要素の間 `space.sm` |

## パネル

| 部分 | トークン |
| --- | --- |
| 面と境界 | 地 `color.bg.default`、枠 `color.border.default`。パネルの外の作業領域は `color.bg.canvas` |
| 見出し | `typography.heading-md` |
| セクション | 区切り線 `color.border.subtle`、左右の余白 `space.md` |
| セクションの見出し | `typography.label` |
| 項目名と値 | 項目名 `color.text.muted`、値 `color.text.default`、どちらも `typography.body` |

## バッジ

| 部分 | トークン |
| --- | --- |
| 文字・形 | `typography.body-sm`、`radius.sm`、上下 `space.2xs`・左右 `space.xs` |
| 通常 | 地 `color.bg.hover`、文字 `color.text.muted` |
| 選択中の要素名 | 地 `color.primary.default`、文字 `color.primary.on` |
| コンポーネント | 文字と枠 `color.component.default` |
| 成功 | 地 `color.success.subtle`、文字 `color.success.default` |
| エラー | 枠 `color.danger.subtle`、文字 `color.danger.default` |
