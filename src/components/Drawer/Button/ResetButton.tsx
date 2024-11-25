import { FC, useContext } from "react";
import styles from "./Button.module.scss";
import { statusContext } from "../../../StatusContext";
import { Icon } from "../../General/Icon";

const ResetButton: FC = () => {
  const { currentAction, resetClickHandler } = useContext(statusContext);
  const disabled = currentAction !== "" && !currentAction.startsWith("reset");

  const resetText =
    currentAction === ""
      ? "RESET DATA"
      : currentAction === "reset1"
      ? "REALLY RESET?"
      : "REALLY REALLY??";

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
      {currentAction.startsWith("reset") ? (
        <button
          onClick={() => resetClickHandler(true)}
          className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
          style={{ background: "#fa1414" }}
        >
          CANCEL
        </button>
      ) : null}
    </div>
  );
};

export default ResetButton;
