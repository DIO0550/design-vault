# design-vault

[![ci](https://github.com/DIO0550/design-vault/actions/workflows/ci.yml/badge.svg)](https://github.com/DIO0550/design-vault/actions/workflows/ci.yml)
[![pages](https://github.com/DIO0550/design-vault/actions/workflows/pages.yml/badge.svg)](https://github.com/DIO0550/design-vault/actions/workflows/pages.yml)

**見本ページ: https://dio0550.github.io/design-vault/**

どのリポジトリからでも Claude にデザインシステムを読み込ませ、人間も同じ内容をブラウザで確認できるようにするためのリポジトリ。

デザインは**パターン**単位で持つ。パターンごとに値と使い分けが違い、トークン名は全パターンで揃えている（`tokens.css` を差し替えるだけで切り替えられる）。

| 置き場所 | 中身 |
| --- | --- |
| `tokens/patterns/<パターン>/tokens.json` | 正本（DTCG 形式）。値はここにだけ書く |
| `tokens/patterns/<パターン>/guide.md` | そのパターンの使い分け（手書き。値は書かない）。冒頭の段落が DESIGN.md の Overview になり、見出しは DESIGN.md の節の名前（Colors / Typography / Layout / Shapes / Do's and Don'ts など）を仕様の順に使う |
| `dist/<パターン>/tokens.css` / `tokens.ts` | 実装向けの生成物 |
| `plugins/design-system/skills/design-system/references/<パターン>/DESIGN.md` | [Google の DESIGN.md 仕様](https://github.com/google-labs-code/design.md)の形の生成物。先頭の YAML に tokens.json と `tokens/components.json` のトークン、本文に guide.md の使い分け。Claude 以外のエージェントや DESIGN.md 対応のツールもこれ 1 枚で読める。CI が公式の linter（`pnpm lint:design-md`）で検査する |
| `tokens/components.json` | 部品の各部分に使うトークン（全パターン共通）。DESIGN.md の `components` になる |
| [`SKILL.md`](plugins/design-system/skills/design-system/SKILL.md) | 全パターン共通のルールとパターンの選び方 |
| [`references/components.md`](plugins/design-system/skills/design-system/references/components.md) | 部品（ボタン・入力欄・リストの行・パネル・バッジ）の各部分にどのトークンを使うか。パターンに依らない |
| [見本ページ](https://dio0550.github.io/design-vault/)（[`site/`](site/)） | ホームにパターンの一覧を置き、サイドバーから基礎（色・文字・余白・角丸）とコンポーネントの画面を開く。外枠は basic パターンで描き、見本の枠の中だけを右上で選んだパターンで描く。`?pattern=<名前>&page=<画面>` で直接開ける。画面の一覧は [`site/src/pages.json`](site/src/pages.json)。main へのマージで [`pages.yml`](.github/workflows/pages.yml) がデプロイする |

## 利用側リポジトリでの設定

`.claude/settings.json` にマーケットプレイスを登録し、プラグインを有効にする。プロジェクト側に書くので DevContainer でもそのまま使える。

```json
{
  "extraKnownMarketplaces": {
    "design-vault": {
      "source": { "source": "github", "repo": "DIO0550/design-vault" }
    }
  },
  "enabledPlugins": {
    "design-system@design-vault": true
  }
}
```

`CLAUDE.md` に 1 行入れて、UI 作業でスキルが確実に使われるようにし、使うパターンを指定する。

```markdown
UI を実装・変更するときは design-system スキルの composer パターンに従う。
```

`tokens.css` の配布方法（npm パッケージか、git タグ / jsDelivr か）は未定。

## 開発

```bash
pnpm install
pnpm build:tokens        # 全パターンの tokens.json を検証し、dist/ と DESIGN.md を生成する
pnpm lint:design-md      # 生成した DESIGN.md を公式の linter で検査する（error で失敗、warning は表示のみ）
pnpm check:release-age   # lock の全パッケージが公開から 7 日以上経っているかを確かめる
pnpm site:dev            # 見本ページを手元で開く（http://localhost:5173/design-vault/）
```

- トークンや guide.md を変えたら `pnpm build:tokens` を実行し、生成物も一緒にコミットする（CI が差分を見る）
- パターンを足すときは `tokens/patterns/<名前>/` に tokens.json と guide.md を置く。トークン名がほかのパターンと揃っていないとビルドが止まる
- 依存の追加・更新は `pnpm-workspace.yaml` の `minimumReleaseAge`（7 日）に従う。Actions は `.github/workflows/actions.lock` で固定し、更新は `gh actions-lock` で行う

## 見本ページのプレビューと視覚差分（VRT）

プレビューと VRT の成果物はどれも gh-pages ブランチに置くので、Pages の Source は **Deploy from a branch（`gh-pages` / root）** にする。

| ワークフロー | gh-pages の置き場所 | 中身 |
| --- | --- | --- |
| [`pages.yml`](.github/workflows/pages.yml)（main） | ルート・`visual-baseline/` | 見本ページ本体と、VRT の baseline の撮り直し |
| [`pr-preview.yml`](.github/workflows/pr-preview.yml)（PR） | `pr-preview/pr-<番号>/` | PR の見本ページ。URL を PR に固定コメントで貼る。PR を閉じると消す |
| [`visual-regression.yml`](.github/workflows/visual-regression.yml)（PR） | `visual-regression/pr-<番号>/` | パターン × 画面（`site/src/pages.json`）× 画面幅（desktop 1280 / mobile 390）ごとにページ全体を撮って baseline と比べたレポート。パターンに依らないホームはパターンを付けずに 1 回だけ撮る |

- VRT は差分があるとチェックが赤になる。レポートで確かめ、意図した変更なら PR に `visual-approved` ラベルを付けると通る
- 手元で撮るときは `pnpm site:build && pnpm visual:capture -- --out visual-actual`（Chrome が要る。見つからないときは `CHROME_BIN` で指定）、比べるときは `pnpm visual:compare -- --expected <baseline> --actual visual-actual --out visual-report`
