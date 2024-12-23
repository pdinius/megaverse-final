import { FC, useState } from "react";
import styles from "./Search.module.scss";

interface SearchProps {}

export const Search: FC<SearchProps> = ({}) => {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Array<string>>([]);

  return (
    <div className={styles.container}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {options.length ? (
        <pre className={styles.dropdown}>{options.join("\n")}</pre>
      ) : null}
    </div>
  );
};
