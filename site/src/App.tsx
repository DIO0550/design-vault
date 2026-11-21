import type { ReactElement } from "react";
import { formatValue, type Token, Tokens, tokensOf } from "./tokens";

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

const ContrastPairs = (): ReactElement => {
  const pairs = Tokens.flatMap((fg) => fg.contrastWith.map((bg) => ({ fg, bg })));
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

const Colors = (): ReactElement => (
  <>
    <div className="grid">
      {tokensOf("color").map((t) => (
        <div key={t.path} className="card">
          <div className="swatch" style={{ background: `var(${t.cssVar})` }} />
          <TokenMeta token={t} />
        </div>
      ))}
    </div>
    <h3 className="subheading">コントラストを確かめた組（4.5:1 以上）</h3>
    <ContrastPairs />
  </>
);

const Typography = (): ReactElement => (
  <div className="stack">
    {tokensOf("typography").map((t) => (
      <div key={t.path} className="card">
        <p className="type-sample" style={{ font: `var(${t.cssVar})` }}>
          デザインシステム Design System 0123
        </p>
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

const Spacing = (): ReactElement => (
  <div className="stack">
    {tokensOf("space").map((t) => (
      <div key={t.path} className="card row">
        <div className="space-bar" style={{ width: `var(${t.cssVar})` }} />
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

const Radius = (): ReactElement => (
  <div className="grid">
    {tokensOf("radius").map((t) => (
      <div key={t.path} className="card">
        <div className="radius-box" style={{ borderRadius: `var(${t.cssVar})` }} />
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

const SectionBody = ({ id }: { id: (typeof Sections)[number]["id"] }): ReactElement => {
  switch (id) {
    case "colors":
      return <Colors />;
    case "typography":
      return <Typography />;
    case "spacing":
      return <Spacing />;
    case "radius":
      return <Radius />;
  }
};

export const App = (): ReactElement => (
  <div className="layout">
    <header className="header">
      <h1 className="title">design-vault</h1>
      <p className="lead">
        正本 <code>tokens/tokens.json</code> から生成したデザイントークンの見本。このページ自体も <code>tokens.css</code>{" "}
        の CSS 変数だけで組んでいる。
      </p>
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
          <SectionBody id={s.id} />
        </section>
      ))}
    </main>
  </div>
);
