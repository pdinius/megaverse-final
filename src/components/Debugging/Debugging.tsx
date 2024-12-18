import { FC, useContext, useEffect, useState } from "react";
import styles from "./Debugging.module.scss";
import { statusContext } from "../../StatusContext";

export const Debugging: FC = () => {
  const { currentState, loadFromDebugOnClick, isLegalStateData } =
    useContext(statusContext);
  const [editedState, setEditedState] = useState("");

  useEffect(() => {
    setEditedState(JSON.stringify(JSON.parse(currentState), null, 2));
  }, [currentState]);

  const legal = isLegalStateData(editedState.trim());

  return (
    <div className={styles.container}>
      <textarea
        value={editedState}
        onChange={(e) => setEditedState(e.target.value)}
      />
      <button
        disabled={!legal}
        className={`${styles.btn} ${legal ? styles.disabled : ""}`}
        onClick={(e) => {
          e.preventDefault();
          if (!legal) return;
          loadFromDebugOnClick(editedState);
          setEditedState("");
        }}
      >
        {legal ? "load state" : "illegal state"}
      </button>
    </div>
  );
};
