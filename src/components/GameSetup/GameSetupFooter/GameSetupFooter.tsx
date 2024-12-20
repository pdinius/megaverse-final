import { FC, useContext, useState } from "react";
import styles from "./GameSetupFooter.module.scss";
import upperStyles from "../GameSetup.module.scss";
import { statusContext } from "../../../StatusContext";
import { translations } from "../../../lib/translations";
import { HeroKey } from "../../../types/heroes";
import { ANIM_TIME, DEADPOOL_FIGHT_BTN } from "../../../lib/constants";

interface FooterContentProps {}

const FooterContent: FC<FooterContentProps> = () => {
  const {
    currentAction,
    currentBtnClicked,
    won,
    lost,
    heroRoster,
    resolveDeadpool,
    resolveDeadpoolVictim,
    areGameResolutionButtonsClickable,
    toggleModalOpen,
  } = useContext(statusContext);
  const [deadpoolScore, setDeadpoolScore] = useState("0");

  const disabled = !areGameResolutionButtonsClickable();

  let content = (
    <div className={styles.btnContainer}>
      <button
        disabled={disabled}
        onClick={() => {
          toggleModalOpen(false);
          setTimeout(won, ANIM_TIME);
        }}
      >
        WON <span className={styles.emoji}>&#128527;</span>
      </button>
      <button
        disabled={disabled}
        onClick={() => {
          toggleModalOpen(false);
          setTimeout(lost, ANIM_TIME);
        }}
      >
        LOST <span className={styles.emoji}>&#128552;</span>
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
        <button
          disabled={disabled}
          onClick={() => {
            toggleModalOpen(false);
            setTimeout(resolveDeadpoolVictim, ANIM_TIME);
          }}
        >
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
