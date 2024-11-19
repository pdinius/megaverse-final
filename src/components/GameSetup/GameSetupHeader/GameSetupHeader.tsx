import { FC, useContext } from "react";
import styles from "./GameSetupHeader.module.scss";
import upperStyles from "../GameSetup.module.scss";
import { statusContext } from "../../../StatusContext";
import CloseButton from "./CloseButton/CloseButton";
import { translations } from "../../../lib/translations";
import { villainInfo } from "../../../lib/villain-info";

interface GameSetupHeaderProps {
  closeModal: () => void;
}

export const GameSetupHeader: FC<GameSetupHeaderProps> = ({
  closeModal,
}) => {
  const { currentAction, currentBtnClicked } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <div className={upperStyles.title}>
        {currentAction !== "choosingDeadpoolVictim" ? (
          <CloseButton onClick={closeModal} />
        ) : null}
        {currentAction === "choosingDeadpoolVictim"
          ? "PICK DEADPOOL'S VICTIM"
          : "PICK YOUR ROSTER"}
      </div>
      {currentAction === "resolvingFight" ? (
        <div className={styles.subtitle}>
          vs. {translations[villainInfo[currentBtnClicked].key]}
        </div>
      ) : null}
    </div>
  );
};
