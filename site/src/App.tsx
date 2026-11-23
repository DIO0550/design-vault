import { type ReactElement, useEffect, useRef, useState } from "react";
import { PatternSelect } from "./PatternSelect";
import { BadgePage, ButtonPage, InputPage, ListRowPage, PanelPage } from "./pages/Components";
import { Colors, Radius, Spacing, Typography } from "./pages/Foundations";
import { Home } from "./pages/Home";
import { navSections, type Page, Pages } from "./pages";
import { downloadDesignMd, type Pattern, Patterns, summaryOf } from "./tokens";

/** pages.json の id → 画面の中身（ホーム以外）。pages.json に足した画面がここに無ければ「まだありません」と出す */
const PageBodies: Readonly<Record<string, (props: { pattern: Pattern; onNotify: (message: string) => void }) => ReactElement>> = {
  "foundations/colors": Colors,
  "foundations/typography": Typography,
  "foundations/spacing": Spacing,
  "foundations/radius": Radius,
  "components/button": ButtonPage,
  "components/input": InputPage,
  "components/list-row": ListRowPage,
  "components/panel": PanelPage,
  "components/badge": BadgePage,
};

const PatternQueryKey = "pattern";
const PageQueryKey = "page";

type Location = Readonly<{ pattern: Pattern; page: Page }>;

/**
 * 表示する画面は ?pattern=<名前>&page=<id> で決める。ハッシュやパスで分けないのは、
 * GitHub Pages で直接リンクを開いても 404 にならず、VRT も URL だけで各画面を撮れるようにするため。
 */
const readLocation = (): Location => {
  const params = new URLSearchParams(window.location.search);
  return {
    pattern: Patterns.find((p) => p.name === params.get(PatternQueryKey)) ?? Patterns[0],
    page: Pages.find((p) => p.id === params.get(PageQueryKey)) ?? Pages[0],
  };
};

const hrefOf = ({ pattern, page }: Location): string => {
  const params = new URLSearchParams({ [PatternQueryKey]: pattern.name, [PageQueryKey]: page.id });
  return `?${params}`;
};

const designMdUrlOf = (pattern: Pattern): string =>
  `https://github.com/DIO0550/design-vault/blob/main/plugins/design-system/skills/design-system/references/${pattern.name}/DESIGN.md`;

const componentsMdUrl =
  "https://github.com/DIO0550/design-vault/blob/main/plugins/design-system/skills/design-system/references/components.md";

const repoUrl = "https://github.com/DIO0550/design-vault";

const FirstFoundationPage = Pages.find((p) => p.id.startsWith("foundations/")) ?? Pages[0];
const FirstComponentPage = Pages.find((p) => p.id.startsWith("components/")) ?? Pages[0];

const DownloadIcon = (): ReactElement => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const App = (): ReactElement => {
  const [location, setLocation] = useState(readLocation);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const { pattern, page } = location;

  useEffect(() => {
    const onPopState = () => setLocation(readLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  };

  const navigate = (next: Location) => {
    setLocation(next);
    window.history.pushState(null, "", hrefOf(next));
  };

  const linkTo = (next: Location) => ({
    href: hrefOf(next),
    onClick: (event: { preventDefault: () => void }) => {
      event.preventDefault();
      navigate(next);
    },
  });

  const handleDownload = (target: Pattern) => {
    downloadDesignMd(target);
    notify(`${target.name}-DESIGN.md をダウンロードしました`);
  };

  const isHome = page.group === null;
  const topSection = isHome ? "home" : page.id.startsWith("foundations/") ? "foundations" : "components";
  const Body = PageBodies[page.id];
  const sidebarSections = navSections().filter((section) => section.group !== null);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a className="brand" {...linkTo({ pattern, page: Pages[0] })}>
              <span className="brand-mark" aria-hidden="true">
                DV
              </span>
              <span className="brand-name">Design Vault</span>
            </a>
            <nav className="topnav" aria-label="主要セクション">
              <a
                className="topnav-link"
                aria-current={topSection === "home" ? "page" : undefined}
                {...linkTo({ pattern, page: Pages[0] })}
              >
                Overview
              </a>
              <a
                className="topnav-link"
                aria-current={topSection === "foundations" ? "page" : undefined}
                {...linkTo({ pattern, page: FirstFoundationPage })}
              >
                Foundations
              </a>
              <a
                className="topnav-link"
                aria-current={topSection === "components" ? "page" : undefined}
                {...linkTo({ pattern, page: FirstComponentPage })}
              >
                Components
              </a>
            </nav>
          </div>
          <div className="topbar-right">
            <a className="topbar-meta-link" href={repoUrl} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      {isHome ? (
        <main className="home-main">
          <Home
            hrefOf={(p) => hrefOf({ pattern: p, page: FirstFoundationPage })}
            onOpenPattern={(p) => navigate({ pattern: p, page: FirstFoundationPage })}
            designMdUrlOf={designMdUrlOf}
            onDownload={handleDownload}
            onNotify={notify}
          />
        </main>
      ) : (
        <div className="detail-layout">
          <aside className="sidebar" aria-label="詳細ナビゲーション">
            <div className="sidebar-top">
              <PatternSelect value={pattern} onChange={(next) => navigate({ pattern: next, page })} />
              <nav className="sidebar-nav" aria-label="画面">
                {sidebarSections.map(({ group, pages }) => (
                  <div key={group} className="sidebar-group">
                    <div className="sidebar-label">{group}</div>
                    <div className="sidebar-links">
                      {pages.map((p) => (
                        <a
                          key={p.id}
                          className="sidebar-link"
                          aria-current={p.id === page.id ? "page" : undefined}
                          {...linkTo({ pattern, page: p })}
                        >
                          <span>{p.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
            <div className="sidebar-footer">
              <button type="button" className="btn-download btn-download--full" onClick={() => handleDownload(pattern)}>
                <DownloadIcon />
                <span className="btn-download-text">{pattern.name} DESIGN.md</span>
              </button>
            </div>
          </aside>

          <main className="detail-main">
            <header className="detail-header">
              <div className="detail-heading">
                <p className="breadcrumb">{page.group}</p>
                <h1 className="page-title">{page.title}</h1>
              </div>
              <div className="detail-meta">
                <span className="pattern-meta-pill">{summaryOf(pattern)}</span>
                <a className="text-link" href={designMdUrlOf(pattern)} target="_blank" rel="noreferrer">
                  DESIGN.md ↗
                </a>
                {page.id.startsWith("components/") && (
                  <a className="text-link" href={componentsMdUrl} target="_blank" rel="noreferrer">
                    components.md ↗
                  </a>
                )}
              </div>
            </header>

            {Body ? <Body pattern={pattern} onNotify={notify} /> : <p className="muted-text">この画面はまだありません。</p>}
          </main>
        </div>
      )}

      {toast && (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
};
