import type { ReactElement } from "react";
import { formatValue, type Pattern, type Token, tokensOf } from "../tokens";

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
          data-design-pattern={pattern.name}
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

export const Colors = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <>
    <div className="grid">
      {tokensOf(pattern, "color").map((t) => (
        <div key={t.path} className="card">
          <div className="swatch" data-design-pattern={pattern.name} style={{ background: `var(${t.cssVar})` }} />
          <TokenMeta token={t} />
        </div>
      ))}
    </div>
    <h3 className="subheading">コントラストを確かめた組（4.5:1 以上）</h3>
    <ContrastPairs pattern={pattern} />
  </>
);

export const Typography = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="stack">
    {tokensOf(pattern, "typography").map((t) => (
      <div key={t.path} className="card">
        <p className="type-sample" data-design-pattern={pattern.name} style={{ font: `var(${t.cssVar})` }}>
          デザインシステム Design System 0123
        </p>
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

export const Spacing = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="stack">
    {tokensOf(pattern, "space").map((t) => (
      <div key={t.path} className="card row">
        <div className="space-bar" data-design-pattern={pattern.name} style={{ width: `var(${t.cssVar})` }} />
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);

export const Radius = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="grid">
    {tokensOf(pattern, "radius").map((t) => (
      <div key={t.path} className="card">
        <div className="radius-box" data-design-pattern={pattern.name} style={{ borderRadius: `var(${t.cssVar})` }} />
        <TokenMeta token={t} />
      </div>
    ))}
  </div>
);
