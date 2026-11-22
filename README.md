# design-vault

[![ci](https://github.com/DIO0550/design-vault/actions/workflows/ci.yml/badge.svg)](https://github.com/DIO0550/design-vault/actions/workflows/ci.yml)
[![pages](https://github.com/DIO0550/design-vault/actions/workflows/pages.yml/badge.svg)](https://github.com/DIO0550/design-vault/actions/workflows/pages.yml)

**見本ページ: https://dio0550.github.io/design-vault/**

どのリポジトリからでも Claude にデザインシステムを読み込ませ、人間も同じ内容をブラウザで確認できるようにするためのリポジトリ。

- 正本は [`tokens/tokens.json`](tokens/tokens.json)（DTCG 形式）だけ。`dist/` と `references/tokens.md` はそこから生成する
- AI 向け: Claude Code プラグイン `design-system`（[`SKILL.md`](plugins/design-system/skills/design-system/SKILL.md) + [`references/tokens.md`](plugins/design-system/skills/design-system/references/tokens.md)）
- 実装向け: [`dist/tokens.css`](dist/tokens.css)（CSS 変数）・[`dist/tokens.ts`](dist/tokens.ts)
- 人間向け: [見本ページ](https://dio0550.github.io/design-vault/)（[`site/`](site/)。色・文字・余白・角丸を並べ、ページ自体も `tokens.css` だけで組んでいる）。main へのマージで [`pages.yml`](.github/workflows/pages.yml) が自動でデプロイする

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

`CLAUDE.md` に 1 行入れて、UI 作業でスキルが確実に使われるようにする。

```markdown
UI を実装・変更するときは design-system スキルに従う。
```

`tokens.css` の配布方法（npm パッケージか、git タグ / jsDelivr か）は未定。

## 開発

```bash
pnpm install
pnpm build:tokens        # tokens.json を検証し、dist/ と references/tokens.md を生成する
pnpm check:release-age   # lock の全パッケージが公開から 7 日以上経っているかを確かめる
pnpm site:dev            # 見本ページを手元で開く（http://localhost:5173/design-vault/）
```

- トークンを変えたら `pnpm build:tokens` を実行し、生成物も一緒にコミットする（CI が差分を見る）
- 依存の追加・更新は `pnpm-workspace.yaml` の `minimumReleaseAge`（7 日）に従う。Actions は `.github/workflows/actions.lock` で固定し、更新は `gh actions-lock` で行う

## 見本ページのプレビューと視覚差分（VRT）

design-composer の Storybook 向けの仕組みを見本ページ向けに移植したもの。どれも gh-pages ブランチに置くので、Pages の Source は **Deploy from a branch（`gh-pages` / root）** にする。

| ワークフロー | gh-pages の置き場所 | 中身 |
| --- | --- | --- |
| [`pages.yml`](.github/workflows/pages.yml)（main） | ルート・`visual-baseline/` | 見本ページ本体と、VRT の baseline の撮り直し |
| [`pr-preview.yml`](.github/workflows/pr-preview.yml)（PR） | `pr-preview/pr-<番号>/` | PR の見本ページ。URL を PR に固定コメントで貼る。PR を閉じると消す |
| [`visual-regression.yml`](.github/workflows/visual-regression.yml)（PR） | `visual-regression/pr-<番号>/` | パターンごと・画面幅（desktop 1280 / mobile 390）ごとにページ全体を撮って baseline と比べたレポート |

- VRT は差分があるとチェックが赤になる。レポートで確かめ、意図した変更なら PR に `visual-approved` ラベルを付けると通る
- 手元で撮るときは `pnpm site:build && pnpm visual:capture -- --out visual-actual`（Chrome が要る。見つからないときは `CHROME_BIN` で指定）、比べるときは `pnpm visual:compare -- --expected <baseline> --actual visual-actual --out visual-report`
