import { FC, useContext } from "react";
import styles from "./Button.module.scss";
import { statusContext } from "../../../StatusContext";

interface SaveLoadButtonProps {}

const SaveLoadButton: FC<SaveLoadButtonProps> = () => {
  const { currentAction, toggleDebuggingMode } = useContext(statusContext);

  const disabled = currentAction !== "";

  return (
    <div className={styles.container}>
      <button
        onClick={toggleDebuggingMode}
        className={`${styles.btn} ${disabled ? styles.disabled : ""}`}
        disabled={disabled}
      >
        SAVE / LOAD FROM CODE
      </button>
    </div>
  );
};

export default SaveLoadButton;
