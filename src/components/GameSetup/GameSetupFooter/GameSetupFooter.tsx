import { FC, useContext, useState } from "react";
import styles from "./GameSetupFooter.module.scss";
import upperStyles from "../GameSetup.module.scss";
import { statusContext } from "../../../StatusContext";
import { translations } from "../../../lib/translations";
import { HeroKey } from "../../../types/heroes";

interface FooterContentProps {}

const FooterContent: FC<FooterContentProps> = () => {
  const {
    currentAction,
    roster,
    won,
    lost,
    resolveDeadpool,
    resolveDeadpoolVictim,
    isTooManyPets
  } = useContext(statusContext);
  const [deadpoolScore, setDeadpoolScore] = useState("0");

  let disabled = roster.size === 0;
  let content = <></>;
  switch (currentAction) {
    case "fightingDeadpool":
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
      break;
    case "choosingDeadpoolVictim":
      content = (
        <div className={styles.btnContainer}>
          <button disabled={disabled} onClick={resolveDeadpoolVictim}>
            GOODBYE{" "}
            {translations[roster.keys().next().value as HeroKey] || "..."}
            <span className={styles.emoji}>&#128128;</span>
          </button>
        </div>
      );
      break;
    default:
      disabled ||= isTooManyPets();
      content = (
        <div className={styles.btnContainer}>
          <button disabled={disabled} onClick={won}>
            WON <span className={styles.emoji}>&#128527;</span>
          </button>
          <button disabled={disabled} onClick={lost}>
            LOST <span className={styles.emoji}>&#128552;</span>
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
