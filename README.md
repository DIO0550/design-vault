# design-vault

どのリポジトリからでも Claude にデザインシステムを読み込ませ、人間も同じ内容をブラウザで確認できるようにするためのリポジトリ。

- 正本は [`tokens/tokens.json`](tokens/tokens.json)（DTCG 形式）だけ。`dist/` と `references/tokens.md` はそこから生成する
- AI 向け: Claude Code プラグイン `design-system`（[`SKILL.md`](plugins/design-system/skills/design-system/SKILL.md) + [`references/tokens.md`](plugins/design-system/skills/design-system/references/tokens.md)）
- 実装向け: [`dist/tokens.css`](dist/tokens.css)（CSS 変数）・[`dist/tokens.ts`](dist/tokens.ts)

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
```

- トークンを変えたら `pnpm build:tokens` を実行し、生成物も一緒にコミットする（CI が差分を見る）
- 依存の追加・更新は `pnpm-workspace.yaml` の `minimumReleaseAge`（7 日）に従う。Actions は `.github/workflows/actions.lock` で固定し、更新は `gh actions-lock` で行う
