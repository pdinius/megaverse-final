import { FC, useContext } from "react";
import styles from "./Handle.module.scss";
import { TypedEntries } from "../../lib/utils";
import { Icon } from "../General/Icon";
import { statusContext } from "../../StatusContext";

interface HandleProps {}

const Handle: FC<HandleProps> = () => {
  const { drawerOpen, toggleDrawerOpen, getScore, tags } =
    useContext(statusContext);

  return (
    <div className={styles.handle}>
      <div
        className={styles.handleInfo}
        style={{
          opacity: drawerOpen ? 0 : 1,
          padding: drawerOpen ? "0rem" : "0.5rem 1rem",
          width: drawerOpen ? "0px" : "calc(100vw - 3rem)",
        }}
      >
        <div>
          <Icon which="trophy" className={styles.trophyIcon} /> {getScore()}
        </div>
        {Object.values(tags).some((n) => n > 0) ? (
          <div className={styles.tags}>
            {TypedEntries(tags).map(([t, v]) =>
              v > 0 ? (
                <Icon key={t} which={t} className={styles.infoIcon} />
              ) : null
            )}
          </div>
        ) : null}
      </div>
      <button
        className={styles.openButton}
        style={{
          width: drawerOpen ? "100vw" : "3rem",
          borderLeft: drawerOpen ? "1px dashed #fff" : "1px dashed #aaa",
          borderTop: drawerOpen ? "1px dashed #aaa" : "0px dashed #fff",
        }}
        onClick={() => toggleDrawerOpen()}
      >
        <Icon which="bars" className={styles.bars} />
      </button>
    </div>
  );
};

export default Handle;
