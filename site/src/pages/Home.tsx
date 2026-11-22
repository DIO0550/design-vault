import type { ReactElement } from "react";
import { introOf, type Pattern, Patterns, summaryOf } from "../tokens";

const settingsSnippet = `{
  "extraKnownMarketplaces": {
    "design-vault": {
      "source": { "source": "github", "repo": "DIO0550/design-vault" }
    }
  },
  "enabledPlugins": {
    "design-system@design-vault": true
  }
}`;

const PatternCard = ({
  pattern,
  hrefOf,
  designMdUrl,
}: {
  pattern: Pattern;
  hrefOf: (pattern: Pattern) => string;
  designMdUrl: string;
}): ReactElement => (
  <article className="pattern-card">
    <div className="pattern-card-preview" data-design-pattern={pattern.name}>
      <button type="button" className="dv-button">
        キャンセル
      </button>
      <button type="button" className="dv-button dv-button--primary">
        保存
      </button>
      <span className="pattern-card-chips" aria-hidden="true">
        <span style={{ background: "var(--color-primary-default)" }} />
        <span style={{ background: "var(--color-text-default)" }} />
        <span style={{ background: "var(--color-component-default)" }} />
      </span>
    </div>
    <div className="pattern-card-body">
      <h3 className="pattern-card-name">{pattern.name}</h3>
      <p className="pattern-card-intro">{introOf(pattern)}</p>
      <p className="pattern-card-summary">{summaryOf(pattern)}</p>
      <div className="pattern-card-links">
        <a className="link link--strong" href={hrefOf(pattern)}>
          見本を開く
        </a>
        <a className="link" href={designMdUrl}>
          DESIGN.md
        </a>
      </div>
    </div>
  </article>
);

export const Home = ({
  hrefOf,
  designMdUrlOf,
}: {
  hrefOf: (pattern: Pattern) => string;
  designMdUrlOf: (pattern: Pattern) => string;
}): ReactElement => (
  <>
    <p className="lead">
      色・文字・余白・角丸のトークンと、それを使った部品の見本。値はパターンごとの tokens.json
      にだけ書き、このページと Claude 向けのスキルはそこから作っている。
    </p>

    <section className="section">
      <h2 className="section-title">パターン</h2>
      <div className="card-grid">
        {Patterns.map((p) => (
          <PatternCard key={p.name} pattern={p} hrefOf={hrefOf} designMdUrl={designMdUrlOf(p)} />
        ))}
      </div>
    </section>

    <section className="section">
      <h2 className="section-title">見られるもの</h2>
      <div className="card-grid">
        <div className="card">
          <div className="card-title">基礎</div>
          <p className="card-text">色・文字・余白・角丸。トークン名と値、文字色のコントラスト比。</p>
        </div>
        <div className="card">
          <div className="card-title">コンポーネント</div>
          <p className="card-text">ボタン・入力欄・リストの行・パネル・バッジ。種類と状態、各部分に使うトークン。</p>
        </div>
      </div>
    </section>

    <section className="section">
      <h2 className="section-title">Claude Code で使う</h2>
      <p className="card-text">
        利用側リポジトリの .claude/settings.json に登録すると、UI 作業のときに design-system
        スキルが読み込まれる。使うパターンは CLAUDE.md に書く。
      </p>
      <pre className="snippet">{settingsSnippet}</pre>
    </section>
  </>
);
