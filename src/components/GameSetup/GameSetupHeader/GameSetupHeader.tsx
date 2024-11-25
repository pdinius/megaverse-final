import { FC, useContext } from "react";
import styles from "./GameSetupHeader.module.scss";
import upperStyles from "../GameSetup.module.scss";
import { statusContext } from "../../../StatusContext";
import CloseButton from "./CloseButton/CloseButton";
import { translations } from "../../../lib/translations";

export const GameSetupHeader: FC = () => {
  const { currentAction, getCurrentVillain, toggleModalOpen } = useContext(statusContext);
  const villain = getCurrentVillain();

  return villain ? (
    <div className={styles.container}>
      <div className={upperStyles.title}>
        {currentAction !== "choosingDeadpoolVictim" ? (
          <CloseButton onClick={() => toggleModalOpen(false)} />
        ) : null}
        {currentAction === "choosingDeadpoolVictim"
          ? "PICK DEADPOOL'S VICTIM"
          : "PICK YOUR ROSTER"}
      </div>
      {currentAction === "resolvingFight" ? (
        <div className={styles.subtitle}>vs. {translations[villain]}</div>
      ) : null}
    </div>
  ) : null;
};
