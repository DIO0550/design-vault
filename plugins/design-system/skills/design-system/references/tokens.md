<!-- 生成物。tokens/tokens.json を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# デザイントークン一覧

実装では CSS 変数を使い、値を直書きしない。

## color

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `color.bg.default` | `var(--color-bg-default)` | `#ffffff` | ページとカードの地 |
| `color.bg.subtle` | `var(--color-bg-subtle)` | `#f4f5f7` | 区切りたい領域・入力欄の地 |
| `color.text.default` | `var(--color-text-default)` | `#1b1e24` | 本文・見出し |
| `color.text.muted` | `var(--color-text-muted)` | `#5a6170` | 補足・プレースホルダー・無効でない副次情報 |
| `color.border.default` | `var(--color-border-default)` | `#d8dce3` | 区切り線・入力欄の枠 |
| `color.primary.default` | `var(--color-primary-default)` | `#2c56c9` | 主要な操作・リンク・フォーカスリング |
| `color.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上に載る文字 |
| `color.danger.default` | `var(--color-danger-default)` | `#c0262d` | 破壊的な操作・エラー |
| `color.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上に載る文字 |

## font

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `font.family.sans` | `var(--font-family-sans)` | `Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `var(--font-family-mono)` | `'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・数値の桁揃え |

## typography

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `typography.heading-lg` | `var(--typography-heading-lg)` | `700 28px/1.3 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | ページの見出し（1 画面に 1 つ） |
| `typography.heading-md` | `var(--typography-heading-md)` | `700 20px/1.4 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | セクションの見出し |
| `typography.body` | `var(--typography-body)` | `400 16px/1.7 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 本文の既定 |
| `typography.body-sm` | `var(--typography-body-sm)` | `400 14px/1.6 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 密度の高い UI（表・サイドバー） |
| `typography.caption` | `var(--typography-caption)` | `400 12px/1.5 Inter, 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 注記・ラベル。本文には使わない |
| `typography.code` | `var(--typography-code)` | `400 14px/1.6 'JetBrains Mono', SFMono-Regular, Menlo, monospace` | コード・トークン名 |

## space

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `space.xs` | `var(--space-xs)` | `4px` | アイコンと文字の間など、要素内の最小の隙間 |
| `space.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間 |
| `space.md` | `var(--space-md)` | `16px` | コンポーネントの内側の余白・既定の間隔 |
| `space.lg` | `var(--space-lg)` | `32px` | セクションどうしの間 |

## radius

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `radius.sm` | `var(--radius-sm)` | `4px` | 入力欄・タグなど小さな要素 |
| `radius.md` | `var(--radius-md)` | `8px` | カード・ダイアログ |
| `radius.full` | `var(--radius-full)` | `9999px` | 丸ボタン・アバター・ピル |
