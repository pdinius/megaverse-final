import { FC, useContext } from "react";
import styles from "./Button.module.scss";
import { statusContext } from "../../../StatusContext";
import { Icon } from "../../General/Icon";
import { If } from "../../General/If/If";

const ResetButton: FC = () => {
  const { currentAction, resetClickHandler } = useContext(statusContext);
  const disabled = currentAction !== "" && !currentAction.startsWith("reset");

  const resetText =
    currentAction === "reset1"
      ? "REALLY RESET?"
      : currentAction === "reset2"
      ? "REALLY REALLY??"
      : "RESET DATA";

  return (
    <div className={styles.container}>
      <button
        onClick={() => resetClickHandler()}
        disabled={disabled}
        className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
      >
        {resetText}
        <Icon which="trash" />
      </button>
      <If condition={currentAction.startsWith("reset")}>
        <button
          onClick={() => resetClickHandler(true)}
          className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
          style={{ background: "#fa1414" }}
        >
          CANCEL
        </button>
      </If>
    </div>
  );
};

export default ResetButton;
