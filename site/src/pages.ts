// 見本ページの画面の一覧。VRT（.github/scripts/visual-regression.mjs）も同じ pages.json を読んで撮影対象を決める。
import pages from "./pages.json";

/** group が null の画面（ホーム）は見出しの外に置き、パターンに依らない */
export type Page = Readonly<{ id: string; group: string | null; title: string }>;

export const Pages: readonly Page[] = pages;

export type NavSection = Readonly<{ group: string | null; pages: readonly Page[] }>;

/** サイドバーの並び。pages.json の順のまま、同じ見出しの画面を束ねる（見出しのない画面は 1 つずつ置く） */
export const navSections = (): readonly NavSection[] =>
  Pages.reduce<readonly NavSection[]>((sections, page) => {
    const last = sections.at(-1);
    const joinsLast = last !== undefined && page.group !== null && last.group === page.group;
    return joinsLast
      ? [...sections.slice(0, -1), { group: last.group, pages: [...last.pages, page] }]
      : [...sections, { group: page.group, pages: [page] }];
  }, []);
