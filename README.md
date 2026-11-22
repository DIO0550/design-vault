# design-vault

[![ci](https://github.com/DIO0550/design-vault/actions/workflows/ci.yml/badge.svg)](https://github.com/DIO0550/design-vault/actions/workflows/ci.yml)
[![pages](https://github.com/DIO0550/design-vault/actions/workflows/pages.yml/badge.svg)](https://github.com/DIO0550/design-vault/actions/workflows/pages.yml)

**見本ページ: https://dio0550.github.io/design-vault/**

どのリポジトリからでも Claude にデザインシステムを読み込ませ、人間も同じ内容をブラウザで確認できるようにするためのリポジトリ。

デザインは**パターン**単位で持つ。パターンごとに値と使い分けが違い、トークン名は全パターンで揃えている（`tokens.css` を差し替えるだけで切り替えられる）。

| 置き場所 | 中身 |
| --- | --- |
| `tokens/patterns/<パターン>/tokens.json` | 正本（DTCG 形式）。値はここにだけ書く |
| `tokens/patterns/<パターン>/guide.md` | そのパターンの使い分け（手書き。値は書かない） |
| `dist/<パターン>/tokens.css` / `tokens.ts` | 実装向けの生成物 |
| `plugins/design-system/skills/design-system/references/<パターン>/DESIGN.md` | guide.md とトークン表を合わせた生成物。Claude 以外のエージェントや人もこれ 1 枚で読める |
| [`SKILL.md`](plugins/design-system/skills/design-system/SKILL.md) | 全パターン共通のルールとパターンの選び方 |
| [見本ページ](https://dio0550.github.io/design-vault/)（[`site/`](site/)） | パターンを切り替えて見比べられる。`?pattern=<名前>` で直接開ける。main へのマージで [`pages.yml`](.github/workflows/pages.yml) がデプロイする |

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
pnpm check:release-age   # lock の全パッケージが公開から 7 日以上経っているかを確かめる
pnpm site:dev            # 見本ページを手元で開く（http://localhost:5173/design-vault/）
```

- トークンや guide.md を変えたら `pnpm build:tokens` を実行し、生成物も一緒にコミットする（CI が差分を見る）
- パターンを足すときは `tokens/patterns/<名前>/` に tokens.json と guide.md を置く。トークン名がほかのパターンと揃っていないとビルドが止まる
- 依存の追加・更新は `pnpm-workspace.yaml` の `minimumReleaseAge`（7 日）に従う。Actions は `.github/workflows/actions.lock` で固定し、更新は `gh actions-lock` で行う
