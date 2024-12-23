import { FC, useContext, useState } from "react";
import styles from "./GameSetupFooter.module.scss";
import upperStyles from "../GameSetup.module.scss";
import { statusContext } from "../../../StatusContext";
import { translations } from "../../../lib/translations";
import { HeroKey } from "../../../types/heroes";
import { DEADPOOL_FIGHT_BTN } from "../../../lib/constants";

interface FooterContentProps {}

const FooterContent: FC<FooterContentProps> = () => {
  const {
    currentAction,
    currentBtnClicked,
    won,
    lost,
    skip,
    heroRoster,
    resolveDeadpool,
    resolveDeadpoolVictim,
    areGameResolutionButtonsClickable,
  } = useContext(statusContext);
  const [deadpoolScore, setDeadpoolScore] = useState("0");

  const disabled = !areGameResolutionButtonsClickable();

  let content = (
    <div className={styles.btnContainer}>
      <button disabled={disabled} onClick={won}>
        WON <span className={styles.emoji}>&#128527;</span>
      </button>
      <button disabled={disabled} onClick={lost}>
        LOST <span className={styles.emoji}>&#128552;</span>
      </button>
      <button
        onClick={skip}
        title="Will complete the fight but not affect hero cooldowns or points."
      >
        SKIP <span className={styles.emoji}>&#128529;</span>
      </button>
    </div>
  );
  if (currentBtnClicked === DEADPOOL_FIGHT_BTN) {
    content = (
      <div className={styles.btnContainer}>
        SCORE:
        <input
          value={deadpoolScore}
          className={styles.text}
          onChange={(e) => {
            if (/\D/.test(e.target.value)) return;
            setDeadpoolScore(e.target.value);
          }}
          maxLength={2}
        />
        <button
          disabled={disabled}
          onClick={() => {
            setDeadpoolScore("0");
            resolveDeadpool(Number(deadpoolScore));
          }}
        >
          FINISH <span className={styles.emoji}>&#129324;</span>
        </button>
      </div>
    );
  }
  if (currentAction === "choosingDeadpoolVictim") {
    content = (
      <div className={styles.btnContainer}>
        <button disabled={disabled} onClick={resolveDeadpoolVictim}>
          GOODBYE{" "}
          {translations[heroRoster.keys().next().value as HeroKey] || "..."}
          <span className={styles.emoji}>&#128128;</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div
        className={`${upperStyles.title} ${
          disabled ? styles.disabledText : ""
        }`}
      >
        Result
      </div>
      {content}
    </div>
  );
};

export default FooterContent;
