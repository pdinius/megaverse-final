import { FC, useContext } from "react";
import styles from "./ActionTokens.module.scss";
import { statusContext } from "../../../../StatusContext";
import { ACTION_TYPES, ActionType } from "../../../../types/general";
import { TOKEN_SRCS } from "../../../../lib/token-images";

const ActionTokens: FC = () => {
  const { actionTokens } = useContext(statusContext);

  return (
    <div className={styles.actionRow}>
      {ACTION_TYPES.map((t, i) => {
        const qtx = actionTokens[t as ActionType];

        return (
          <div
            key={i}
            className={`${styles.actionItem} ${
              qtx > 0 ? "" : styles.transparent
            }`}
          >
            <img
              src={TOKEN_SRCS[t as ActionType]}
              title={t}
              className={styles.actionIcon}
            />
            <span className={styles[`${t.toLowerCase()}Text`]}>{qtx}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ActionTokens;
