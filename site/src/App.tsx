import { type ReactElement, useState } from "react";
import { PatternSelect } from "./PatternSelect";
import { BadgePage, ButtonPage, InputPage, ListRowPage, PanelPage } from "./pages/Components";
import { Colors, Radius, Spacing, Typography } from "./pages/Foundations";
import { Home } from "./pages/Home";
import { navSections, type Page, Pages } from "./pages";
import { type Pattern, Patterns } from "./tokens";

/**
 * ページの外枠（ナビ・見出し・説明）を描くパターン。見本の枠の中だけを選んだパターンで描き、
 * 外枠はどのパターンを選んでも読みやすい同じ見た目に保つ（11px のような密なパターンで説明まで小さくしない）。
 */
const ChromePatternName = "basic";

/** pages.json の id → 画面の中身（ホーム以外）。pages.json に足した画面がここに無ければ「まだありません」と出す */
const PageBodies: Readonly<Record<string, (props: { pattern: Pattern }) => ReactElement>> = {
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

/** ホームの「見本を開く」の行き先。基礎の最初の画面 */
const FirstSpecimenPage = Pages.find((p) => p.group !== null) ?? Pages[0];

export const App = (): ReactElement => {
  const [location, setLocation] = useState(readLocation);
  const { pattern, page } = location;
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
  const Body = PageBodies[page.id];

  return (
    <div className="layout" data-design-pattern={ChromePatternName}>
      <aside className="sidebar">
        <a className="site-title" {...linkTo({ pattern, page: Pages[0] })}>
          デザインシステム
        </a>
        <nav className="nav" aria-label="画面">
          {navSections().map(({ group, pages }) => (
            <div key={group ?? pages[0].id} className={group === null ? "nav-group nav-group--loose" : "nav-group"}>
              {group !== null && <div className="nav-group-title">{group}</div>}
              {pages.map((p) => (
                <a
                  key={p.id}
                  className="nav-link"
                  aria-current={p.id === page.id ? "page" : undefined}
                  {...linkTo({ pattern, page: p })}
                >
                  {p.title}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="content">
        <header className="page-header">
          <div className="page-heading">
            {page.group !== null && <p className="breadcrumb">{page.group}</p>}
            <h1 className="heading">{page.group === null ? "デザインシステム" : page.title}</h1>
          </div>
          {page.group !== null && (
            <PatternSelect value={pattern} onChange={(next) => navigate({ pattern: next, page })} />
          )}
        </header>
        {page.group === null ? (
          <Home
            hrefOf={(p) => hrefOf({ pattern: p, page: FirstSpecimenPage })}
            designMdUrlOf={designMdUrlOf}
          />
        ) : Body ? (
          <>
            <p className="doc-links">
              <a className="link" href={designMdUrlOf(pattern)}>
                {pattern.name} の DESIGN.md
              </a>
              {page.id.startsWith("components/") && (
                <a className="link" href={componentsMdUrl}>
                  components.md
                </a>
              )}
            </p>
            <Body pattern={pattern} />
          </>
        ) : (
          <p>この画面はまだありません。</p>
        )}
      </main>
    </div>
  );
};
