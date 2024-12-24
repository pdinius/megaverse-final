import { FC, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { reverseTranslations } from "../../lib/translations";
import { statusContext } from "../../StatusContext";
import { Icon } from "../General/Icon";
import { MAX_LENGTH_DROPDOWN } from "../../lib/constants";

const names = Object.keys(reverseTranslations);
const substringLocation = (s: string, sub: string): [number, number] => {
  s = s.toLowerCase();
  sub = sub.toLowerCase();
  const words = s.match(/\w+/g);
  if (words === null) return [Infinity, Infinity];
  const wordIdx = words.findIndex((w) => w.includes(sub));
  const letterIdx = words[wordIdx].indexOf(sub);
  return [wordIdx, letterIdx];
};

export const Search: FC = () => {
  const { overlay, setOverlay } = useContext(statusContext);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Array<string>>([]);
  const [optionIdx, setOptionIdx] = useState(-1);
  const [focused, setFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setOverlay(null);
    setOptionIdx(-1);
    const q = e.target.value;
    const lowerQ = e.target.value.toLowerCase().trim();
    setQuery(q);
    const filteredNames = lowerQ
      ? names
          .filter((n) => n.toLowerCase().includes(lowerQ))
          .sort((a, b) => {
            const [a1, a2] = substringLocation(a, lowerQ);
            const [b1, b2] = substringLocation(b, lowerQ);
            return a1 - b1 || a2 - b2 || a.localeCompare(b);
          })
      : [];
    setOptions(filteredNames);
  };

  const chooseElement = (s: string) => {
    setQuery(s);
    setOverlay(reverseTranslations[s]);
    setOptions([]);
  };

  const formatDropdown = (s: string, i: number) => {
    const trimmed = query.toLowerCase().trim();
    const idx = s.toLowerCase().indexOf(trimmed);
    const sliced = s.slice(0, MAX_LENGTH_DROPDOWN);

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
        {sliced.slice(0, idx)}
        {sliced.length > idx ? (
          <span className={styles.bold}>
            {sliced.slice(idx, idx + trimmed.length)}
          </span>
        ) : null}
        {sliced.length > idx + trimmed.length
          ? sliced.slice(idx + trimmed.length)
          : null}
        {s.length > MAX_LENGTH_DROPDOWN ? <>&hellip;</> : null}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.inputContainer}
        style={
          {
            // width: "2rem",
          }
        }
      >
        <button
          className={styles.cancelContainer}
          style={{
            opacity: overlay ? 1 : 0,
            transitionDelay: overlay ? "0.2s" : "0s",
          }}
          onClick={() => {
            setOverlay(null);
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
            paddingLeft: overlay ? "2rem" : "1rem",
            transitionDelay: overlay ? "0s" : "0.05s",
            width: focused || query.trim() ? "250px" : "0px",
            paddingInline: focused || query.trim() ? "1rem 2rem" : "1rem",
          }}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              if (overlay) {
                setOverlay(null);
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
              if (newOptionIdx === options.length) newOptionIdx = 0;
            }
            if (e.key === "ArrowUp") {
              newOptionIdx = optionIdx - 1;
              if (newOptionIdx === -1) newOptionIdx = options.length - 1;
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
