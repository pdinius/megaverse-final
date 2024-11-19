import { FC, useContext } from "react";
import styles from "./ActionTokens.module.scss";
import { ActionType } from "@/app/types/rewards";
import MOVE from "@/assets/icons/move-icon.png";
import FIGHT from "@/assets/icons/fight-icon.png";
import HEROIC from "@/assets/icons/heroic-icon.png";
import WILD from "@/assets/icons/wild-icon.png";
import { statusContext } from "@/app/page";

export const TOKEN_SRCS: { [key in ActionType]: string } = {
  MOVE: MOVE.src,
  FIGHT: FIGHT.src,
  HEROIC: HEROIC.src,
  WILD: WILD.src,
};

const ActionTokens: FC = () => {
  const { actionTokens } = useContext(statusContext);

  return (
    <div className={styles.actionRow}>
      {Object.keys(TOKEN_SRCS).map((t, i) => {
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
