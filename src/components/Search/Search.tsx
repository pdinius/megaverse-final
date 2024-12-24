import { FC, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { reverseTranslations, translations } from "../../lib/translations";
import { statusContext } from "../../StatusContext";
import { Icon } from "../General/Icon";
import { MAX_LENGTH_DROPDOWN } from "../../lib/constants";
import { TypedKeys } from "../../lib/utils";

const names = Object.keys(reverseTranslations);

export const Search: FC = () => {
  const { overlays, setOverlays } = useContext(statusContext);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Array<string>>([]);
  const [optionIdx, setOptionIdx] = useState(-1);
  const [focused, setFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setOverlays(null);
    setOptionIdx(-1);
    const q = e.target.value;
    const lowerQ = e.target.value.toLowerCase().trim();
    setQuery(q);
    const filteredNames = lowerQ
      ? names
          .filter((n) => n.toLowerCase().includes(lowerQ))
          .sort((a, b) => {
            return (
              a.toLowerCase().indexOf(lowerQ) -
                b.toLowerCase().indexOf(lowerQ) || a.localeCompare(b)
            );
          })
      : [];
    setOptions(filteredNames);
  };

  const chooseElement = (s: string) => {
    setQuery(s);
    setOverlays(
      TypedKeys(translations).filter((key) => translations[key] === s)
    );
    setOptions([]);
  };

  const formatDropdown = (s: string, i: number) => {
    const trimmed = query.toLowerCase().trim();
    const idx = s.toLowerCase().indexOf(trimmed);
    const sliced = s.slice(0, MAX_LENGTH_DROPDOWN);

    const a = sliced.slice(0, idx);
    const b =
      sliced.length > idx ? sliced.slice(idx, idx + trimmed.length) : "";
    const c =
      sliced.length > idx + trimmed.length
        ? sliced.slice(idx + trimmed.length)
        : "";

    return (
      <div
        key={i}
        className={`${styles.option} ${
          i === optionIdx ? styles.hoverOption : ""
        }`}
        onClick={() => chooseElement(s)}
        onMouseOver={() => {
          setOptionIdx(i);
        }}
      >
        {a}
        {a[a.length - 1] === " " || b[0] === " " ? <>&#20;</> : null}
        <span className={styles.bold}>{b}</span>
        {b[b.length - 1] === " " || c[0] === " " ? <>&#20;</> : null}
        {c}
        {s.length > MAX_LENGTH_DROPDOWN ? <>&hellip;</> : null}
      </div>
    );
  };

  const show = focused || query.trim();

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <button
          className={styles.cancelContainer}
          style={{
            opacity: overlays ? 1 : 0,
            transitionDelay: overlays ? "0.2s" : "0s",
          }}
          onClick={() => {
            setOverlays(null);
            setQuery("");
            inputRef.current?.focus();
          }}
        >
          <Icon which={"xmark"} className={styles.cancelIcon} />
        </button>
        <input
          className={styles.input}
          value={query}
          onChange={onChangeHandler}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            borderBottomLeftRadius: options.length ? "0rem" : "var(--radius)",
            borderBottomRightRadius: options.length ? "0rem" : "var(--radius)",
            paddingLeft: overlays ? "2rem" : "1rem",
            transitionDelay: overlays ? "0s" : "0.05s",
            width: show ? "250px" : "0px",
            paddingInline: show ? "1rem 2rem" : "1rem",
            caretColor: show ? undefined : "transparent",
          }}
          ref={inputRef}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Escape") {
              if (overlays) {
                setOverlays(null);
                setQuery("");
              } else {
                inputRef.current?.blur();
              }
            }
            if (options.length === 0) return;
            if (e.key === "Enter") {
              chooseElement(options[optionIdx > -1 ? optionIdx : 0]);
            }
            let newOptionIdx = optionIdx;
            if (e.key === "ArrowDown") {
              newOptionIdx = optionIdx + 1;
              if (newOptionIdx >= options.length) newOptionIdx = 0;
            }
            if (e.key === "ArrowUp") {
              newOptionIdx = optionIdx - 1;
              if (newOptionIdx < 0) newOptionIdx = options.length - 1;
            }
            if (newOptionIdx === optionIdx) return;
            setOptionIdx(newOptionIdx);

            const ddr = dropdownRef.current;
            if (newOptionIdx === -1 || ddr === null) return;
            if (ddr.scrollHeight <= ddr.clientHeight) return;

            const top = (ddr.children[newOptionIdx] as HTMLElement).offsetTop;
            ddr.scrollTo({ top, behavior: "smooth" });
          }}
        />
        <button
          className={styles.magnifyingContainer}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          <Icon which={"magnifying-glass"} className={styles.magnifyingIcon} />
        </button>
      </div>
      {options.length ? (
        <div className={styles.dropdown} ref={dropdownRef}>
          {options.map(formatDropdown)}
        </div>
      ) : null}
    </div>
  );
};
