// コンポーネントの見本。見た目は components.css（トークンだけで書いた dv-* クラス）が決め、
// どの部分にどのトークンを使うかは references/components.md と揃える。
import { type ReactElement, type ReactNode, useState } from "react";
import type { Pattern } from "../tokens";

type SpecimenSurface = "canvas" | "default";

/** 見本の枠。枠の中だけを選んだパターンの変数で描き、ページの外枠とは切り分ける */
const Specimen = ({
  pattern,
  title,
  children,
}: {
  pattern: Pattern;
  title: string;
  children: ReactNode;
}): ReactElement => {
  const [surface, setSurface] = useState<SpecimenSurface>("canvas");
  return (
    <section className="specimen">
      <h2 className="subheading">{title}</h2>
      <div className="specimen-frame">
        <div className="specimen-bar">
          <div className="specimen-bar-left">
            <span
              className="pattern-accent-dot"
              data-design-pattern={pattern.name}
              style={{ background: "var(--color-primary-default)" }}
              aria-hidden="true"
            />
            <span className="specimen-pattern-name">{pattern.name}</span>
            <code className="specimen-file">dist/{pattern.name}/tokens.css</code>
          </div>
          <div className="segmented segmented--sm" role="group" aria-label="見本の背景">
            <button
              type="button"
              className="segmented-btn"
              aria-pressed={surface === "canvas"}
              onClick={() => setSurface("canvas")}
            >
              bg.canvas
            </button>
            <button
              type="button"
              className="segmented-btn"
              aria-pressed={surface === "default"}
              onClick={() => setSurface("default")}
            >
              bg.default
            </button>
          </div>
        </div>
        <div
          className="specimen-body"
          data-design-pattern={pattern.name}
          style={{
            background: surface === "canvas" ? "var(--color-bg-canvas)" : "var(--color-bg-default)",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

const TokenList = ({ items }: { items: readonly (readonly [string, string])[] }): ReactElement => (
  <section className="specimen">
    <h2 className="subheading">使うトークン</h2>
    <dl className="token-list">
      {items.map(([part, tokens]) => (
        <div key={part} className="token-list-row">
          <dt>{part}</dt>
          <dd>
            <code>{tokens}</code>
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export const ButtonPage = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="component-stack">
    <Specimen pattern={pattern} title="種類">
      <button type="button" className="dv-button dv-button--primary">
        保存
      </button>
      <button type="button" className="dv-button">
        キャンセル
      </button>
      <button type="button" className="dv-button dv-button--danger">
        削除
      </button>
      <button type="button" className="dv-button dv-button--ghost">
        詳細
      </button>
    </Specimen>
    <Specimen pattern={pattern} title="無効">
      <button type="button" className="dv-button dv-button--primary" disabled>
        保存
      </button>
      <button type="button" className="dv-button" disabled>
        キャンセル
      </button>
    </Specimen>
    <TokenList
      items={[
        ["文字", "typography.body"],
        ["主要（primary）", "color.primary.default / color.primary.on"],
        ["通常", "color.bg.default / color.border.default / color.text.default"],
        ["破壊的（danger）", "color.bg.default / color.border.default / color.danger.default"],
        ["控えめ（ghost）", "color.text.muted、hover で color.bg.hover"],
        ["無効", "color.text.disabled / color.bg.subtle"],
        ["角丸・余白", "radius.md / space.xs space.md"],
        ["フォーカス", "color.primary.default の outline"],
      ]}
    />
  </div>
);

export const InputPage = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="component-stack">
    <Specimen pattern={pattern} title="状態">
      <label className="dv-field">
        <span className="dv-field__label">名前</span>
        <input className="dv-input" placeholder="login-form" />
      </label>
      <label className="dv-field">
        <span className="dv-field__label">幅</span>
        <input className="dv-input" defaultValue="720" />
      </label>
      <label className="dv-field">
        <span className="dv-field__label">トークン</span>
        <input className="dv-input" defaultValue="color.unknown" aria-invalid="true" />
        <span className="dv-field__error">このトークンは定義されていません</span>
      </label>
      <label className="dv-field">
        <span className="dv-field__label">高さ</span>
        <input className="dv-input" defaultValue="900" disabled />
      </label>
    </Specimen>
    <TokenList
      items={[
        ["ラベル", "typography.label / color.text.muted"],
        ["入力欄", "typography.body / color.bg.subtle / color.border.default / radius.md"],
        ["プレースホルダー", "color.text.placeholder"],
        ["フォーカス", "color.primary.default の枠"],
        ["エラー", "color.danger.default の枠と文字"],
        ["無効", "color.text.disabled"],
      ]}
    />
  </div>
);

export const ListRowPage = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="component-stack">
    <Specimen pattern={pattern} title="状態">
      <ul className="dv-list">
        <li className="dv-row">
          <span className="dv-row__icon">▸</span>
          <span className="dv-row__label">header</span>
          <span className="dv-row__meta">720 × 64</span>
        </li>
        <li className="dv-row dv-row--selected">
          <span className="dv-row__icon">▾</span>
          <span className="dv-row__label">login-form</span>
          <span className="dv-row__meta">選択中</span>
        </li>
        <li className="dv-row dv-row--nested">
          <span className="dv-row__icon dv-row__icon--component">◆</span>
          <span className="dv-row__label dv-row__label--component">email-input</span>
          <span className="dv-row__meta">instance</span>
        </li>
        <li className="dv-row dv-row--nested">
          <span className="dv-row__icon">T</span>
          <span className="dv-row__label">submit-label</span>
        </li>
      </ul>
    </Specimen>
    <TokenList
      items={[
        ["名前", "typography.body / color.text.default"],
        ["アイコン・開閉の印・寸法", "color.text.subtle"],
        ["hover", "color.bg.hover"],
        ["選択中", "color.primary.subtle の地（文字は変えない）"],
        ["コンポーネント・インスタンス", "color.component.default（アイコンと名前）"],
        ["字下げ・間隔", "space.md / space.sm / radius.md"],
      ]}
    />
  </div>
);

export const PanelPage = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="component-stack">
    <Specimen pattern={pattern} title="構成">
      <div className="dv-panel">
        <div className="dv-panel__header">Box</div>
        <div className="dv-panel__section">
          <div className="dv-panel__title">レイアウト</div>
          <div className="dv-panel__grid">
            <span className="dv-panel__key">幅</span>
            <span className="dv-panel__value">720</span>
            <span className="dv-panel__key">高さ</span>
            <span className="dv-panel__value">900</span>
          </div>
        </div>
        <div className="dv-panel__section">
          <div className="dv-panel__title">塗り</div>
          <div className="dv-panel__grid">
            <span className="dv-panel__key">fill</span>
            <span className="dv-panel__value">
              <code>color.bg.default</code>
            </span>
          </div>
        </div>
      </div>
    </Specimen>
    <TokenList
      items={[
        ["面と境界", "color.bg.default / color.border.default（作業領域は color.bg.canvas）"],
        ["見出し", "typography.heading-md / color.text.default"],
        ["セクション", "color.border.subtle の区切り線 / space.md"],
        ["セクションの見出し", "typography.label"],
        ["項目名と値", "color.text.muted / color.text.default / typography.body"],
      ]}
    />
  </div>
);

export const BadgePage = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <div className="component-stack">
    <Specimen pattern={pattern} title="種類">
      <span className="dv-badge">default</span>
      <span className="dv-badge dv-badge--primary">login-form</span>
      <span className="dv-badge dv-badge--component">◆ component</span>
      <span className="dv-badge dv-badge--success">saved</span>
      <span className="dv-badge dv-badge--danger">error</span>
    </Specimen>
    <TokenList
      items={[
        ["文字・角丸", "typography.body-sm / radius.sm / space.2xs space.xs"],
        ["通常", "color.bg.hover / color.text.muted"],
        ["選択中の要素名", "color.primary.default / color.primary.on"],
        ["コンポーネント", "color.component.default の文字と枠"],
        ["成功", "color.success.subtle / color.success.default"],
        ["エラー", "color.danger.subtle の枠 / color.danger.default"],
      ]}
    />
  </div>
);
