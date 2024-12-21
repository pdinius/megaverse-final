import { FC, useContext, useEffect, useState } from "react";
import styles from "./Debugging.module.scss";
import { statusContext } from "../../StatusContext";
import { Icon } from "../General/Icon";
import DebuggingModal from "./DebuggingModal/DebuggingModal";
import ResourceGrid from "./ResourceGrid/ResourceGrid";

export const Debugging: FC = () => {
  const {
    currentState,
    loadFromDebugOnClick,
    isLegalStateData,
    toggleDebuggingMode,
  } = useContext(statusContext);
  const [editedState, setEditedState] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setEditedState(JSON.stringify(JSON.parse(currentState), null, 2));
  }, [currentState]);

  const toggleModalOpen = (b = !modalOpen) => setModalOpen(b);

  const legal = isLegalStateData(editedState.trim());

  return (
    <div className={styles.container}>
      <button
        className={styles.helpButton}
        onClick={(e) => {
          e.preventDefault();
          toggleModalOpen();
        }}
      >
        <Icon which={"help"} />
      </button>
      <textarea
        value={editedState}
        onChange={(e) => setEditedState(e.target.value)}
      />
      <div className={styles.btns}>
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
        <button
          disabled={!legal}
          className={`${styles.btn} ${styles.cancel}`}
          onClick={(e) => {
            e.preventDefault();
            if (!legal) return;
            setEditedState("");
            toggleDebuggingMode();
          }}
        >
          cancel
        </button>
      </div>
      <DebuggingModal isOpen={modalOpen} toggleOpen={toggleModalOpen}>
        <div className={styles.debuggingContent}>
          <div className={styles.header}>Editing Megaverse Progress</div>
          <div>
            The text box on this page shows your campaign's progress in JSON
            format. It's easy to understand even if you don't understand code or
            haven't heard of JSON before. All the information is in{" "}
            <div className={styles.code}>item: value</div> format (e.g.{" "}
            <div className={styles.code}>"KEY": 2</div> would mean you have 2
            key resources). The following the structure and purpose of each
            value:
          </div>
          <div className={`${styles.header2} ${styles.indent}`}>tags</div>
          <div className={styles.indent2}>
            Each value inside this section represents a different map resources.
            Modify any number to modify the amount of that resource.
          </div>
          <ResourceGrid />
        </div>
      </DebuggingModal>
    </div>
  );
};
