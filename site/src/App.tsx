import { type ReactElement, useState } from "react";
import { formatValue, type Pattern, Patterns, type Token, tokensOf } from "./tokens";

const Sections = [
  { id: "colors", title: "色" },
  { id: "typography", title: "文字" },
  { id: "spacing", title: "余白" },
  { id: "radius", title: "角丸" },
] as const;

const cssVarOf = (path: string): string => `--${path.replaceAll(".", "-")}`;

const TokenMeta = ({ token }: { token: Token }): ReactElement => (
  <div className="token-meta">
    <code className="token-name">{token.cssVar}</code>
    <span className="token-value">{formatValue(token.value)}</span>
    <span className="token-description">{token.description}</span>
  </div>
);

const ContrastPairs = ({ pattern }: { pattern: Pattern }): ReactElement => {
  const pairs = pattern.tokens.flatMap((fg) => fg.contrastWith.map((bg) => ({ fg, bg })));
  return (
    <div className="pairs">
      {pairs.map(({ fg, bg }) => (
        <div
          key={`${fg.path}-${bg}`}
          className="pair"
          style={{ color: `var(${fg.cssVar})`, background: `var(${cssVarOf(bg)})` }}
        >
          <span className="pair-sample">Aa あア</span>
          <code className="pair-label">
            {fg.path} on {bg}
          </code>
        </div>
      ))}
    </div>
  );
};

const Colors = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <>
    <div className="grid">
      {tokensOf(pattern, "color").map((t) => (
        <div key={t.path} className="card">
          <div className="swatch" style={{ background: `var(${t.cssVar})` }} />
          <TokenMeta token={t} />
        </div>
      ))}
    </div>
    <h3 className="subheading">コントラストを確かめた組（4.5:1 以上）</h3>
    <ContrastPairs pattern={pattern} />
  </>
);

const Typography = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="stack">
    {tokensOf(pattern, "typography").map((t) => (
      <div key={t.path} className="card">
        <p className="type-sample" style={{ font: `var(${t.cssVar})` }}>
          デザインシステム Design System 0123
        </p>
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

const Spacing = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="stack">
    {tokensOf(pattern, "space").map((t) => (
      <div key={t.path} className="card row">
        <div className="space-bar" style={{ width: `var(${t.cssVar})` }} />
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

const Radius = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="grid">
    {tokensOf(pattern, "radius").map((t) => (
      <div key={t.path} className="card">
        <div className="radius-box" style={{ borderRadius: `var(${t.cssVar})` }} />
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

const SectionBody = ({ id, pattern }: { id: (typeof Sections)[number]["id"]; pattern: Pattern }): ReactElement => {
  switch (id) {
    case "colors":
      return <Colors pattern={pattern} />;
    case "typography":
      return <Typography pattern={pattern} />;
    case "spacing":
      return <Spacing pattern={pattern} />;
    case "radius":
      return <Radius pattern={pattern} />;
  }
};

const PatternQueryKey = "pattern";

/** ?pattern=<名前> で開いたパターンを選ぶ。見本ページの URL をパターンごとに共有できるようにするため */
const readInitialPattern = (): Pattern => {
  const requested = new URLSearchParams(window.location.search).get(PatternQueryKey);
  return Patterns.find((p) => p.name === requested) ?? Patterns[0];
};

export const App = (): ReactElement => {
  const [pattern, setPattern] = useState(readInitialPattern);
  const selectPattern = (next: Pattern) => {
    setPattern(next);
    const url = new URL(window.location.href);
    url.searchParams.set(PatternQueryKey, next.name);
    window.history.replaceState(null, "", url);
  };
  return (
  <div className="layout" data-design-pattern={pattern.name}>
    <header className="header">
      <h1 className="title">design-vault</h1>
      <p className="lead">
        パターンごとの正本 <code>tokens/patterns/*/tokens.json</code> から生成したデザイントークンの見本。このページ自体も、選んだパターンの CSS 変数だけで組んでいる。
      </p>
      <div className="patterns" role="radiogroup" aria-label="パターン">
        {Patterns.map((p) => (
          <button
            key={p.name}
            type="button"
            role="radio"
            aria-checked={p.name === pattern.name}
            className="pattern-button"
            onClick={() => selectPattern(p)}
          >
            {p.name}
          </button>
        ))}
        <a className="design-md-link" href={`https://github.com/DIO0550/design-vault/blob/main/plugins/design-system/skills/design-system/references/${pattern.name}/DESIGN.md`}>
          DESIGN.md
        </a>
      </div>
      <nav className="nav">
        {Sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="nav-link">
            {s.title}
          </a>
        ))}
      </nav>
    </header>
    <main>
      {Sections.map((s) => (
        <section key={s.id} id={s.id} className="section">
          <h2 className="heading">{s.title}</h2>
          <SectionBody id={s.id} pattern={pattern} />
        </section>
      ))}
    </main>
  </div>
  );
};
