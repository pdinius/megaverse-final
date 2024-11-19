import { FC, useContext } from "react";
import styles from "./Button.module.scss";
import { statusContext } from "../../../StatusContext";
import { Icon } from "../../General/Icon";

const ResetButton: FC = () => {
  const { currentAction, resetClickHandler, clearCurrentAction } =
    useContext(statusContext);
  const disabled = currentAction !== "" && !currentAction.startsWith("reset");

  return (
    <div className={styles.container}>
      <button
        onClick={resetClickHandler}
        disabled={disabled}
        className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
      >
        {currentAction === "reset1" ? (
          <>
            REALLY RESET? <Icon which="trash" />
          </>
        ) : currentAction === "reset2" ? (
          <>
            REALLY REALLY? <Icon which="trash" />
          </>
        ) : (
          <>
            RESET DATA <Icon which="trash" />
          </>
        )}
      </button>
      {currentAction.startsWith("reset") ? (
        <button
          onClick={clearCurrentAction}
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
