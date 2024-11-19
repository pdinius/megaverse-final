import { FC, useContext } from "react";
import styles from "./SpendButton.module.scss";
import { statusContext } from "../../../StatusContext";
import { CurrentAction } from "../../../types/game-status";

interface SpendButtonProps {
  actionName: CurrentAction;
  disabled: boolean;
}

const SpendButton: FC<SpendButtonProps> = ({ actionName, disabled }) => {
  const { blocked, connected, currentAction, spendButtonClickHandler } =
    useContext(statusContext);

  disabled ||= connected.length < 2 || (blocked && currentAction !== actionName);
  const active = currentAction === actionName;

  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${active ? styles.cancelBtn : ""}`}
      onClick={() => spendButtonClickHandler(actionName)}
    >
      {active ? "cancel" : "spend"}
    </button>
  );
};

export default SpendButton;
