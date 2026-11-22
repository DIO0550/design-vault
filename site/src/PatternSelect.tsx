// パターンの選択。ネイティブの select では色見本や説明を出せないため、WAI-ARIA の listbox（折りたたみ型）で作る。
import { type KeyboardEvent, type ReactElement, useId, useRef, useState } from "react";
import { type Pattern, Patterns, summaryOf } from "./tokens";

/** そのパターンの主色・文字色・作業領域の地を並べた小さな見本。値は tokens.scoped.css の変数から取る */
const PatternSwatches = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <span className="pattern-swatches" data-design-pattern={pattern.name} aria-hidden="true">
    <span style={{ background: "var(--color-primary-default)" }} />
    <span style={{ background: "var(--color-text-default)" }} />
    <span style={{ background: "var(--color-bg-canvas)" }} />
  </span>
);

const PatternLabel = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <>
    <PatternSwatches pattern={pattern} />
    <span className="pattern-text">
      <span className="pattern-name">{pattern.name}</span>
      <span className="pattern-summary">{summaryOf(pattern)}</span>
    </span>
  </>
);

const clampIndex = (index: number): number => Math.min(Math.max(index, 0), Patterns.length - 1);

export const PatternSelect = ({
  value,
  onChange,
}: {
  value: Pattern;
  onChange: (pattern: Pattern) => void;
}): ReactElement => {
  const id = useId();
  const labelId = `${id}-label`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selectedIndex = Patterns.findIndex((p) => p.name === value.name);

  const openList = (index: number) => {
    setActive(clampIndex(index));
    setOpen(true);
  };
  const close = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };
  const choose = (index: number) => {
    onChange(Patterns[index]);
    close(true);
  };

  const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openList(selectedIndex);
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const moves: Readonly<Record<string, number>> = {
      ArrowDown: active + 1,
      ArrowUp: active - 1,
      Home: 0,
      End: Patterns.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActive(clampIndex(moves[event.key]));
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(active);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === "Tab") close(false);
  };

  return (
    <div className="pattern-select" ref={rootRef}>
      <span id={labelId} className="pattern-select-label">
        パターン
      </span>
      <button
        ref={buttonRef}
        type="button"
        className="pattern-select-button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${labelId} ${id}-button`}
        id={`${id}-button`}
        // 開いているときに押しても一覧の blur で先に閉じないよう、フォーカスの移動を止めてクリックだけで閉じる
        onMouseDown={(event) => {
          if (open) event.preventDefault();
        }}
        onClick={() => (open ? close(true) : openList(selectedIndex))}
        onKeyDown={onButtonKeyDown}
      >
        <PatternLabel pattern={value} />
        <svg className="pattern-select-caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <ul
          // 開いたらすぐ矢印キーで選べるよう、一覧そのものにフォーカスを移す
          ref={(element) => element?.focus()}
          role="listbox"
          tabIndex={-1}
          className="pattern-select-list"
          aria-labelledby={labelId}
          aria-activedescendant={optionId(active)}
          onKeyDown={onListKeyDown}
          onBlur={(event) => {
            // 外をクリックしたときやフォーカスが外へ出たときに閉じる
            if (!rootRef.current?.contains(event.relatedTarget)) close(false);
          }}
        >
          {Patterns.map((p, index) => (
            <li
              key={p.name}
              id={optionId(index)}
              role="option"
              aria-selected={index === selectedIndex}
              className="pattern-select-option"
              data-active={index === active}
              onMouseMove={() => setActive(index)}
              onClick={() => choose(index)}
            >
              <PatternLabel pattern={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
