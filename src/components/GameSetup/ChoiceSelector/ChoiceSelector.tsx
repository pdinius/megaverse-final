import { useState } from "react";
import styles from "./ChoiceSelector.module.scss";
import { partition } from "../../../lib/utils";
import Accordion from "../../General/Accordion/Accordion";
import { Icon } from "../../General/Icon";
import Dots from "../../General/Dots/Dots";

export interface ChoiceSelectorProps<T extends string> {
  title: string;
  subtitle?: string;
  data: Array<T>;
  srcs: { [key in T]?: string };
  selection: Set<T>;
  itemClickHandler: (v: T) => void;
  itemClickable: (v: T) => boolean;
  titleGenerator: (v: T) => string;
}

const PAGE_SIZE = 4;

const ChoiceSelector = <T extends string>({
  title,
  subtitle,
  data,
  srcs,
  selection,
  itemClickHandler,
  itemClickable,
  titleGenerator,
}: ChoiceSelectorProps<T>) => {
  const [page, setPage] = useState(0);

  const actualPageSize = Math.min(PAGE_SIZE, data.length);
  const pages = partition(data, actualPageSize);
  const pageCount = Math.ceil(data.length / actualPageSize);

  return (
    <Accordion title={title} subtitle={subtitle}>
      <div className={styles.container}>
        {pages.length > 1 ? (
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className={styles.switchPageBtn}
          >
            <Icon which="left-chevron" />
          </button>
        ) : null}
        <div
          className={styles.items}
          style={{
            width: `${64 * actualPageSize + 8 * (actualPageSize - 1)}px`,
          }}
        >
          {pages.map((p, i) => (
            <div
              key={i}
              style={{
                left: `calc(${100 * (i - page)}%)`,
              }}
            >
              {p.map((key, i) => {
                const clickable = itemClickable(key);

                return (
                  <img
                    key={i}
                    src={srcs[key]}
                    title={titleGenerator(key)}
                    alt={key}
                    className={`${styles.item} ${clickable ? "clickable" : ""}`}
                    style={{
                      opacity: selection.has(key) ? 1 : 0.4,
                      filter: clickable ? "revert" : "grayscale(1)",
                    }}
                    onClick={
                      clickable ? () => itemClickHandler(key) : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
        {pages.length > 1 ? (
          <button
            disabled={page + 1 === pageCount}
            onClick={() => setPage(page + 1)}
            className={styles.switchPageBtn}
          >
            <Icon which="right-chevron" />
          </button>
        ) : null}
      </div>
      {pages.length > 1 ? <Dots count={pageCount} current={page} /> : null}
    </Accordion>
  );
};

export default ChoiceSelector;
