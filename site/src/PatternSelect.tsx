// パターン数が増えても破綻しない検索付きポップオーバー・ピッカー。
import { type KeyboardEvent, type ReactElement, useEffect, useId, useRef, useState } from "react";
import { modeOf, type Pattern, Patterns, summaryOf } from "./tokens";

const PatternDots = ({ pattern }: { pattern: Pattern }): ReactElement => (
  <span className="picker-dots" data-design-pattern={pattern.name} aria-hidden="true">
    <span className="picker-dot" style={{ background: "var(--color-bg-canvas)" }} />
    <span className="picker-dot" style={{ background: "var(--color-primary-default)" }} />
  </span>
);

export const PatternSelect = ({
  value,
  onChange,
}: {
  value: Pattern;
  onChange: (pattern: Pattern) => void;
}): ReactElement => {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = Patterns.filter((p) => {
    if (!normalizedQuery) return true;
    return (
      p.name.toLowerCase().includes(normalizedQuery) ||
      modeOf(p).includes(normalizedQuery) ||
      summaryOf(p).toLowerCase().includes(normalizedQuery)
    );
  });

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const close = (returnFocus: boolean) => {
    setOpen(false);
    setQuery("");
    if (returnFocus) buttonRef.current?.focus();
  };

  const choose = (pattern: Pattern) => {
    onChange(pattern);
    close(true);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (filtered.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const target = filtered[activeIndex] ?? filtered[0];
      if (target) choose(target);
    }
  };

  return (
    <div className="pattern-picker" ref={rootRef}>
      <span id={`${id}-label`} className="sidebar-label">
        Pattern
      </span>
      <button
        ref={buttonRef}
        type="button"
        className="picker-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-trigger`}
        id={`${id}-trigger`}
        onClick={() => {
          if (open) {
            close(true);
          } else {
            const idx = Patterns.findIndex((p) => p.name === value.name);
            setActiveIndex(Math.max(idx, 0));
            setOpen(true);
          }
        }}
      >
        <span className="picker-trigger-main">
          <PatternDots pattern={value} />
          <span className="picker-trigger-name">{value.name}</span>
          <span className="picker-trigger-count">({Patterns.length})</span>
        </span>
        <svg className="picker-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </button>

      {open && (
        <div className="picker-popover">
          <div className="picker-search-wrap">
            <svg className="picker-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="picker-search"
              placeholder="パターンを検索..."
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKeyDown}
              aria-label="パターンを検索"
            />
          </div>
          <ul role="listbox" className="picker-list" aria-labelledby={`${id}-label`}>
            {filtered.length === 0 ? (
              <li className="picker-empty">該当するパターンがありません</li>
            ) : (
              filtered.map((p, index) => {
                const selected = p.name === value.name;
                return (
                  <li
                    key={p.name}
                    role="option"
                    aria-selected={selected}
                    className="picker-option"
                    data-active={index === activeIndex}
                    onMouseMove={() => setActiveIndex(index)}
                    onClick={() => choose(p)}
                  >
                    <PatternDots pattern={p} />
                    <span className="picker-option-text">
                      <span className="picker-option-head">
                        <span className="picker-option-name">{p.name}</span>
                        <span className="picker-mode-tag">{modeOf(p)}</span>
                      </span>
                      <span className="picker-option-summary">{summaryOf(p)}</span>
                    </span>
                    {selected && (
                      <span className="picker-check" aria-hidden="true">
                        ✓
                      </span>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
