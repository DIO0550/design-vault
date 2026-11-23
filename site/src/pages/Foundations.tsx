import type { ReactElement } from "react";
import { formatValue, type Pattern, type Token, tokensOf } from "../tokens";

const cssVarOf = (path: string): string => `--${path.replaceAll(".", "-")}`;

const TokenMeta = ({ token }: { token: Token }): ReactElement => (
  <div className="token-meta">
    <div className="token-meta-head">
      <code className="token-name">{token.cssVar}</code>
      <span className="token-value">{formatValue(token.value)}</span>
    </div>
    {token.description && <span className="token-description">{token.description}</span>}
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

export const Colors = ({
  pattern,
  onNotify,
}: {
  pattern: Pattern;
  onNotify: (message: string) => void;
}): ReactElement => {
  const copyVar = (cssVar: string) => {
    const text = `var(${cssVar})`;
    navigator.clipboard?.writeText(text).catch(() => {});
    onNotify(`コピーしました: ${text}`);
  };

  return (
    <div className="foundation-stack">
      <div className="swatch-grid">
        {tokensOf(pattern, "color").map((t) => (
          <button
            key={t.path}
            type="button"
            className="swatch-card"
            onClick={() => copyVar(t.cssVar)}
            title={`クリックで var(${t.cssVar}) をコピー`}
          >
            <div className="swatch" data-design-pattern={pattern.name} style={{ background: `var(${t.cssVar})` }}>
              <span className="swatch-copy-hint">Copy var</span>
            </div>
            <div className="swatch-card-body">
              <TokenMeta token={t} />
            </div>
          </button>
        ))}
      </div>

      <section className="subsection">
        <h2 className="subheading">コントラストを確かめた組（4.5:1 以上）</h2>
        <ContrastPairs pattern={pattern} />
      </section>
    </div>
  );
};

export const Typography = ({
  pattern,
  onNotify,
}: {
  pattern: Pattern;
  onNotify: (message: string) => void;
}): ReactElement => (
  <div className="type-list" data-design-pattern={pattern.name}>
    {tokensOf(pattern, "typography").map((t) => (
      <div key={t.path} className="type-row">
        <button
          type="button"
          className="type-meta-btn"
          onClick={() => {
            const text = `var(${t.cssVar})`;
            navigator.clipboard?.writeText(text).catch(() => {});
            onNotify(`コピーしました: ${text}`);
          }}
        >
          <code className="type-token-name">{t.cssVar}</code>
          <span className="type-token-value">{formatValue(t.value)}</span>
          {t.description && <span className="type-token-desc">{t.description}</span>}
        </button>
        <p className="type-sample" style={{ font: `var(${t.cssVar})` }}>
          デザインシステム Design System 0123
        </p>
      </div>
    ))}
  </div>
);

export const Spacing = ({
  pattern,
  onNotify,
}: {
  pattern: Pattern;
  onNotify: (message: string) => void;
}): ReactElement => (
  <div className="token-table">
    {tokensOf(pattern, "space").map((t) => (
      <button
        key={t.path}
        type="button"
        className="space-row"
        onClick={() => {
          const text = `var(${t.cssVar})`;
          navigator.clipboard?.writeText(text).catch(() => {});
          onNotify(`コピーしました: ${text}`);
        }}
      >
        <code className="token-name">{t.cssVar}</code>
        <span className="space-val">{formatValue(t.value)}</span>
        <span className="space-bar-wrap" data-design-pattern={pattern.name}>
          <span className="space-bar" style={{ width: `var(${t.cssVar})` }} />
        </span>
        <span className="token-description space-desc">{t.description}</span>
      </button>
    ))}
  </div>
);

export const Radius = ({
  pattern,
  onNotify,
}: {
  pattern: Pattern;
  onNotify: (message: string) => void;
}): ReactElement => (
  <div className="radius-grid">
    {tokensOf(pattern, "radius").map((t) => (
      <button
        key={t.path}
        type="button"
        className="radius-card"
        onClick={() => {
          const text = `var(${t.cssVar})`;
          navigator.clipboard?.writeText(text).catch(() => {});
          onNotify(`コピーしました: ${text}`);
        }}
      >
        <div className="radius-preview" data-design-pattern={pattern.name}>
          <div className="radius-box" style={{ borderRadius: `var(${t.cssVar})` }} />
        </div>
        <div className="swatch-card-body">
          <TokenMeta token={t} />
        </div>
      </button>
    ))}
  </div>
);
