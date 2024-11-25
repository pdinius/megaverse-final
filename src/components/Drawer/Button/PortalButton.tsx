import { FC, useContext } from "react";
import styles from "./PortalButton.module.scss";
import { statusContext } from "../../../StatusContext";

const PortalButton: FC = () => {
  const { currentAction, isPortalButtonClickable, portalButtonClickHandler } =
    useContext(statusContext);

  const active = currentAction === "spendingPortal";

  return (
    <button
      disabled={!isPortalButtonClickable()}
      className={`${styles.btn} ${active ? styles.cancelBtn : ""}`}
      onClick={portalButtonClickHandler}
    >
      {active ? "cancel" : "spend"}
    </button>
  );
};

export default PortalButton;
