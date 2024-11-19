import { FC, useContext } from "react";
import styles from "./Button.module.scss";
import { statusContext } from "../../../StatusContext";
import { Icon } from "../../General/Icon";

const UndoButton: FC = () => {
  const { blocked, undo, undoDisabled } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <button
        onClick={() => undo()}
        disabled={undoDisabled}
        className={`${styles.btn} ${
          undoDisabled || blocked ? styles.disabled : ""
        }`}
      >
        UNDO <Icon which="undo" />
      </button>
    </div>
  );
};

export default UndoButton;