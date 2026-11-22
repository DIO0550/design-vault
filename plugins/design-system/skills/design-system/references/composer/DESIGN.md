<!-- 生成物。tokens/patterns/composer/ の tokens.json と guide.md を直して pnpm build:tokens で作り直す。手で書き換えない。 -->

# composer パターン

design-composer の UI 案（`docs/Design Composer.html`）から作ったパターン。白いパネルとグレーの段階で組む、密度の高いデスクトップツールの外枠向け。文字は IBM Plex Sans / Mono で、`typography.body` を既定にする。

## 色

- 文字は 5 段階を役割で使い分ける。読ませる文字は `color.text.default`、ラベルや補足は `color.text.muted`、プレースホルダーと空状態の案内は `color.text.placeholder`、アイコン・開閉の印・寸法表示は `color.text.subtle`、無効な操作とショートカット表記は `color.text.disabled`
- `color.text.muted` を 4.5:1 で読めると確かめてあるのは `color.bg.default` の上だけ。`color.bg.subtle` や `color.bg.hover` の上のラベルは `color.text.default` にする
- `color.text.subtle` `color.text.disabled` `color.text.placeholder` はコントラスト比 4.5:1 に届かない。UI 案どおり補助的な表示に限って使い、操作の結果やエラーなど、読み落とすと困る情報には使わない
- `color.primary.default` は選択・アクティブ状態・フォーカスリングの色。白地の上の文字としては 4.5:1 に届かないため、文字に使うのはアクティブなタブ名やアイコンなど、位置や形でも状態が分かる箇所に限る
- 選択中の行は地を `color.primary.subtle` にし、文字は `color.text.default` のまま変えない
- `color.primary.on` は `color.primary.default` の地に載せる小さなラベル（選択中の要素名のバッジなど）だけに使う。この組も 4.5:1 に届かないため、長い文には使わない
- `color.component.default` はコンポーネントとインスタンスの目印（◆ のアイコン・名前・選択枠）に使う。それ以外の強調には使わない
- エラーは文字を `color.danger.default`、枠を `color.danger.subtle` にする。地を赤で塗るのは破壊的な操作のボタンだけ
- 面の重なりは、作業領域 `color.bg.canvas` → パネル `color.bg.default` → 入力欄 `color.bg.subtle` の順に明るさで分ける。パネルの境界は `color.border.default`、パネル内のセクションの区切りは `color.border.subtle`

## 文字

- 既定は `typography.body`。行・入力値・ボタンの文字はすべてこれにそろえる
- パネルの見出しは `typography.heading-md`、プロパティ群の見出しは `typography.label`
- `typography.heading-lg` はダイアログと空状態の見出しだけに使う
- `typography.caption` は左端のレールのラベルなど、決まった短い語だけに使う
- トークン名・数値・コードは `typography.code` にする

## 余白と角丸

- パネルの左右の余白は `space.md`、行の中の要素の間は `space.sm`、アイコンと印の間は `space.2xs`
- 入力欄・ボタン・行の選択枠の角丸は `radius.md`、メニューやポップオーバーは `radius.lg`、バッジは `radius.sm`

## Do / Don't

| Do | Don't |
| --- | --- |
| 選択中の行の地を `color.primary.subtle`、文字は `color.text.default` | 選択中の行の文字を `color.primary.default` にする |
| コンポーネントのアイコンと名前に `color.component.default` | 目立たせたいボタンに `color.component.default` を使う |
| エラー文に `color.danger.default` | エラー文に `color.text.subtle` を使って控えめにする |

## トークン



実装では CSS 変数を使い、値を直書きしない。

### color

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `color.bg.default` | `var(--color-bg-default)` | `#ffffff` | パネルとカードの地 |
| `color.bg.subtle` | `var(--color-bg-subtle)` | `#fafafa` | 入力欄・小さな操作部品の地 |
| `color.bg.canvas` | `var(--color-bg-canvas)` | `#f5f5f5` | 作業領域・ウィンドウの背景 |
| `color.bg.hover` | `var(--color-bg-hover)` | `#f0f0f0` | 行やボタンにポインタが乗ったときの地 |
| `color.bg.inverse` | `var(--color-bg-inverse)` | `#1e1e1e` | ツールチップなど反転した面の地 |
| `color.text.default` | `var(--color-text-default)` | `#1e1e1e` | 本文・見出し・値 |
| `color.text.muted` | `var(--color-text-muted)` | `#767676` | ラベル・補足など副次的な文字 |
| `color.text.placeholder` | `var(--color-text-placeholder)` | `#8c8c8c` | プレースホルダー・空状態の案内 |
| `color.text.subtle` | `var(--color-text-subtle)` | `#b3b3b3` | アイコン・開閉の印・寸法表示など補助的な表示。読ませる文章には使わない |
| `color.text.disabled` | `var(--color-text-disabled)` | `#c4c4c4` | 無効な操作・ショートカット表記・区切り記号 |
| `color.text.inverse` | `var(--color-text-inverse)` | `#ffffff` | bg.inverse の上の文字 |
| `color.border.default` | `var(--color-border-default)` | `#e6e6e6` | パネル境界・入力欄の枠 |
| `color.border.subtle` | `var(--color-border-subtle)` | `#f0f0f0` | セクションの区切り線 |
| `color.border.strong` | `var(--color-border-strong)` | `#d4d4d4` | チェックボックス・フレームなど輪郭を立たせたい枠 |
| `color.primary.default` | `var(--color-primary-default)` | `#0d99ff` | 選択・アクティブ状態・フォーカスリング・主要な操作 |
| `color.primary.subtle` | `var(--color-primary-subtle)` | `#e5f4ff` | 選択中の行の地 |
| `color.primary.on` | `var(--color-primary-on)` | `#ffffff` | primary.default の上の文字やアイコン |
| `color.component.default` | `var(--color-component-default)` | `#9747ff` | コンポーネント・インスタンスを示す色（アイコン・名前・枠） |
| `color.danger.default` | `var(--color-danger-default)` | `#d13438` | エラー・破壊的な操作 |
| `color.danger.subtle` | `var(--color-danger-subtle)` | `#f0c8c8` | エラー表示の枠・地 |
| `color.danger.on` | `var(--color-danger-on)` | `#ffffff` | danger.default の上の文字 |
| `color.success.default` | `var(--color-success-default)` | `#2f7d3f` | 成功・正常の表示 |
| `color.success.subtle` | `var(--color-success-subtle)` | `#ecf7ee` | 成功表示の地 |

### font

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `font.family.sans` | `var(--font-family-sans)` | `'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI と本文 |
| `font.family.mono` | `var(--font-family-mono)` | `'IBM Plex Mono', SFMono-Regular, Menlo, monospace` | コード・数値・トークン名 |

### typography

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `typography.heading-lg` | `var(--typography-heading-lg)` | `600 18px/1.4 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | ダイアログ・空状態の見出し |
| `typography.heading-md` | `var(--typography-heading-md)` | `600 13px/1.4 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | パネルの見出し |
| `typography.label` | `var(--typography-label)` | `600 11px/1.4 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | プロパティ群の見出し・強調したい行 |
| `typography.body-lg` | `var(--typography-body-lg)` | `400 12px/1.5 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | メニュー項目・やや大きく読ませたい文 |
| `typography.body` | `var(--typography-body)` | `400 11px/1.4 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | UI の既定の文字（行・入力値・ボタン） |
| `typography.body-sm` | `var(--typography-body-sm)` | `400 10px/1.4 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | 補足・寸法・バッジ |
| `typography.caption` | `var(--typography-caption)` | `500 9px/1.3 'IBM Plex Sans', 'Hiragino Sans', 'Noto Sans JP', system-ui, sans-serif` | レールのラベルなど最小の文字。文章には使わない |
| `typography.code` | `var(--typography-code)` | `400 11px/1.4 'IBM Plex Mono', SFMono-Regular, Menlo, monospace` | トークン名・数値・コード |

### space

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `space.2xs` | `var(--space-2xs)` | `2px` | アイコンと印の間など、密着させたい隙間 |
| `space.xs` | `var(--space-xs)` | `4px` | 要素内の小さな隙間 |
| `space.sm` | `var(--space-sm)` | `8px` | 関連する要素どうしの間・行内の間隔 |
| `space.md` | `var(--space-md)` | `14px` | パネルの左右の余白・既定の間隔 |
| `space.lg` | `var(--space-lg)` | `24px` | セクションどうしの間 |

### radius

| トークン | CSS 変数 | 値 | 使いどころ |
| --- | --- | --- | --- |
| `radius.sm` | `var(--radius-sm)` | `3px` | バッジ・小さな印 |
| `radius.md` | `var(--radius-md)` | `5px` | 入力欄・ボタン・行の選択枠 |
| `radius.lg` | `var(--radius-lg)` | `6px` | メニュー・ポップオーバー・カード |
| `radius.full` | `var(--radius-full)` | `9999px` | 丸いボタン・ドット・ピル |
