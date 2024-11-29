import { FC, useContext } from "react";
import styles from "./Button.module.scss";
import { statusContext } from "../../../StatusContext";

interface SaveLoadButtonProps {}

const SaveLoadButton: FC<SaveLoadButtonProps> = () => {
  const { undoDisabled } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${undoDisabled ? styles.disabled : ""}`}
        disabled={undoDisabled}
      >
        SAVE / LOAD FROM CODE
      </button>
    </div>
  );
};

export default SaveLoadButton;
