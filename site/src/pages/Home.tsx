import { type ReactElement, useState } from "react";
import { introOf, modeOf, type Pattern, Patterns, summaryOf } from "../tokens";

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

type ModeFilter = "all" | "light" | "dark";

const DownloadIcon = (): ReactElement => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PatternCard = ({
  pattern,
  href,
  designMdUrl,
  onOpen,
  onDownload,
}: {
  pattern: Pattern;
  href: string;
  designMdUrl: string;
  onOpen: () => void;
  onDownload: () => void;
}): ReactElement => {
  const mode = modeOf(pattern);
  return (
    <article className="pattern-card">
      <a
        className="pattern-card-preview-link"
        href={href}
        onClick={(event) => {
          event.preventDefault();
          onOpen();
        }}
        aria-label={`${pattern.name} の見本を開く`}
      >
        <div className="pattern-card-preview" data-design-pattern={pattern.name}>
          <div className="pattern-card-preview-row">
            <span className="dv-button dv-button--primary" aria-hidden="true">
              保存
            </span>
            <span className="dv-button" aria-hidden="true">
              キャンセル
            </span>
            <span className="dv-badge dv-badge--component pattern-card-preview-badge" aria-hidden="true">
              ◆ UI
            </span>
          </div>
          <div className="pattern-card-preview-bar" aria-hidden="true">
            <span className="pattern-card-preview-label">login-form</span>
            <span className="pattern-card-dots">
              <span style={{ background: "var(--color-primary-default)" }} />
              <span style={{ background: "var(--color-component-default)" }} />
              <span style={{ background: "var(--color-text-default)" }} />
            </span>
          </div>
        </div>
      </a>

      <div className="pattern-card-body">
        <div className="pattern-card-top">
          <div className="pattern-card-title-row">
            <span
              className="pattern-accent-dot"
              data-design-pattern={pattern.name}
              style={{ background: "var(--color-primary-default)" }}
              aria-hidden="true"
            />
            <h3 className="pattern-card-name">{pattern.name}</h3>
            <span className="mode-badge">{mode}</span>
          </div>
          <p className="pattern-card-intro">{introOf(pattern)}</p>
          <p className="pattern-card-summary">{summaryOf(pattern)}</p>
        </div>

        <div className="pattern-card-actions">
          <button type="button" className="btn-download" onClick={onDownload}>
            <DownloadIcon />
            <span>DESIGN.md</span>
          </button>
          <div className="pattern-card-secondary">
            <a
              className="text-link text-link--strong"
              href={href}
              onClick={(event) => {
                event.preventDefault();
                onOpen();
              }}
            >
              見本を開く →
            </a>
            <a className="text-link text-link--muted" href={designMdUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export const Home = ({
  hrefOf,
  onOpenPattern,
  designMdUrlOf,
  onDownload,
  onNotify,
}: {
  hrefOf: (pattern: Pattern) => string;
  onOpenPattern: (pattern: Pattern) => void;
  designMdUrlOf: (pattern: Pattern) => string;
  onDownload: (pattern: Pattern) => void;
  onNotify: (message: string) => void;
}): ReactElement => {
  const [query, setQuery] = useState("");
  const [modeFilter, setModeFilter] = useState<ModeFilter>("all");

  const normalized = query.trim().toLowerCase();
  const filtered = Patterns.filter((p) => {
    if (modeFilter !== "all" && modeOf(p) !== modeFilter) return false;
    if (!normalized) return true;
    return (
      p.name.toLowerCase().includes(normalized) ||
      introOf(p).toLowerCase().includes(normalized) ||
      summaryOf(p).toLowerCase().includes(normalized)
    );
  });

  const copySnippet = () => {
    navigator.clipboard?.writeText(settingsSnippet).catch(() => {});
    onNotify(".claude/settings.json のスニペットをコピーしました");
  };

  return (
    <div className="home-stack">
      <section className="hero">
        <div className="hero-title-block">
          <p className="hero-eyebrow">DESIGN SYSTEM VAULT</p>
          <h1 className="hero-title">Design Patterns</h1>
        </div>
        <p className="hero-lead">
          色・文字・余白・角丸のトークンと部品の見本をパターン単位で管理しています。気に入ったパターンの{" "}
          <code>DESIGN.md</code> をダウンロードして、そのままエージェントやプロジェクトに組み込めます。
        </p>
      </section>

      <section className="catalog-section" aria-label="デザインパターン一覧">
        <div className="catalog-toolbar">
          <div className="search-field">
            <svg
              className="search-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              className="search-input"
              placeholder="パターン名・用途で検索..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="パターンを検索"
            />
          </div>
          <div className="segmented" role="group" aria-label="テーマ種別で絞り込み">
            {(["all", "light", "dark"] as const).map((m) => (
              <button
                key={m}
                type="button"
                className="segmented-btn"
                aria-pressed={modeFilter === m}
                onClick={() => setModeFilter(m)}
              >
                {m === "all" ? `すべて (${Patterns.length})` : m}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">条件に一致するパターンがありません。</div>
        ) : (
          <div className="pattern-grid">
            {filtered.map((p) => (
              <PatternCard
                key={p.name}
                pattern={p}
                href={hrefOf(p)}
                designMdUrl={designMdUrlOf(p)}
                onOpen={() => onOpenPattern(p)}
                onDownload={() => onDownload(p)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="claude-section">
        <div className="claude-copy">
          <h2 className="section-heading">Claude Code で使う</h2>
          <p className="muted-text">
            利用側リポジトリの <code>.claude/settings.json</code> に登録すると、UI 作業のときに{" "}
            <code>design-system</code> スキルが読み込まれます。使うパターン名は <code>CLAUDE.md</code>{" "}
            に指定してください。
          </p>
        </div>
        <div className="code-box">
          <div className="code-box-header">
            <span>.claude/settings.json</span>
            <button type="button" className="code-copy-btn" onClick={copySnippet}>
              コピー
            </button>
          </div>
          <pre className="snippet">{settingsSnippet}</pre>
        </div>
      </section>
    </div>
  );
};
