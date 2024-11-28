import { FC, useContext } from "react";
import styles from "./SpendButton.module.scss";
import { statusContext } from "../../../StatusContext";
import { CurrentAction } from "../../../types/game-status";

interface SpendButtonProps {
  action: CurrentAction;
}

const SpendButton: FC<SpendButtonProps> = ({ action }) => {
  const {
    currentAction,
    isPortalButtonClickable,
    portalButtonClickHandler,
    isRecoverButtonClickable,
    recoverButtonClickHandler,
  } = useContext(statusContext);

  const active = currentAction === action;
  let clickable = false;
  let clickHandler: () => void = () => {};
  switch (action) {
    case "spendingPortal":
      clickable = isPortalButtonClickable();
      clickHandler = portalButtonClickHandler;
      break;
    case "resolvingRecover":
      clickable = isRecoverButtonClickable("RECOVER");
      clickHandler = () => recoverButtonClickHandler("RECOVER");
      break;
    case "resolvingRecoverF4":
      clickable = isRecoverButtonClickable("RECOVER_F4");
      clickHandler = () => recoverButtonClickHandler("RECOVER_F4");
      break;
    default:
      return null;
  }

  return (
    <button
      disabled={!clickable}
      className={`${styles.btn} ${active ? styles.cancelBtn : ""}`}
      onClick={clickHandler}
    >
      {active ? "cancel" : "spend"}
    </button>
  );
};

export default SpendButton;
