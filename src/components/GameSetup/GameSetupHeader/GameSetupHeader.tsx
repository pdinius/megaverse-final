import { FC, useContext } from "react";
import styles from "./GameSetupHeader.module.scss";
import { statusContext } from "../../../StatusContext";
import CloseButton from "./CloseButton/CloseButton";
import { translations } from "../../../lib/translations";
import { villainInfo } from "../../../lib/villain-info";
import { Challenge } from "./Challenge/Challenge";
import { wikiTranslations } from "../../../lib/wikiTranslations";

export const GameSetupHeader: FC = () => {
  const {
    currentBtnClicked,
    currentAction,
    getCurrentVillain,
    toggleModalOpen,
  } = useContext(statusContext);
  const villain = getCurrentVillain();

  return villain ? (
    <div className={styles.container}>
      <CloseButton onClick={() => toggleModalOpen(false)} />
      <div className={styles.innerContainer}>
        <div className={styles.title}>
          {currentAction === "choosingDeadpoolVictim"
            ? "PICK DEADPOOL'S VICTIM"
            : "PICK YOUR ROSTER"}
        </div>
        {currentAction === "resolvingFight" ? (
          <div className={styles.subtitle}>
            vs.{" "}
            <a
              href={`https://marvel-united.fandom.com/wiki/${
                wikiTranslations[villain!]
              }`}
              target="_blank"
            >
              {translations[villain!]}
            </a>
          </div>
        ) : null}
      </div>
      <Challenge challenges={villainInfo[currentBtnClicked].challenge} />
    </div>
  ) : null;
};
