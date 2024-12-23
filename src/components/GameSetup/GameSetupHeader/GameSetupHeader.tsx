import { FC, useContext } from "react";
import styles from "./GameSetupHeader.module.scss";
import { statusContext } from "../../../StatusContext";
import CloseButton from "./CloseButton/CloseButton";
import { translations } from "../../../lib/translations";
import { villainInfo } from "../../../lib/villain-info";
import { Challenge } from "./Challenge/Challenge";
import { If } from "../../General/If/If";

export const GameSetupHeader: FC = () => {
  const {
    currentBtnClicked,
    currentAction,
    getCurrentVillain,
    toggleModalOpen,
  } = useContext(statusContext);
  const villain = getCurrentVillain();

  return (
    <If condition={villain !== null}>
      <div className={styles.container}>
        <CloseButton onClick={() => toggleModalOpen(false)} />
        <div className={styles.innerContainer}>
          <div className={styles.title}>
            {currentAction === "choosingDeadpoolVictim"
              ? "PICK DEADPOOL'S VICTIM"
              : "PICK YOUR ROSTER"}
          </div>
          <If condition={currentAction === "resolvingFight"}>
            <div className={styles.subtitle}>vs. {translations[villain]}</div>
          </If>
        </div>
        <Challenge challenges={villainInfo[currentBtnClicked].challenge} />
      </div>
    </If>
  );
};
