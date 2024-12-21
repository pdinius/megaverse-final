import { FC, useContext, useEffect, useState } from "react";
import styles from "./Debugging.module.scss";
import { statusContext } from "../../StatusContext";
import { Icon } from "../General/Icon";
import DebuggingModal from "./DebuggingModal/DebuggingModal";
import ResourceGrid from "./ResourceGrid/ResourceGrid";
import { HelpSection } from "./HelpSection/HelpSection";

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
          <HelpSection title="tags">
            Each value inside this section represents a different map resources.
            Modify any number to modify the amount of that resource. In case of
            confusion, you can use this visual to figure out which resource is
            which:
          </HelpSection>
          <ResourceGrid />
          <HelpSection title="actionTokens">
            Each value here represents the amount of "move", "heroic", "fight"
            or "wild" tokens you have available.
          </HelpSection>
          <HelpSection title="heroes">
            Each item here is a sub-set of values under the name of a hero. I
            wouldn't recommend trying to add heroes here that you haven't
            unlocked but you may if you can figure out their name (it's usually
            just capitalized and spaces are replaced with underscores). Each
            hero has these four values:
            <div className={styles.block}>
              <div className={styles.subItem}>
                <span className={styles.bold}>dead:</span>{" "}
                <span className={styles.code}>true</span> or{" "}
                <span className={styles.code}>false</span> depending on whether
                the hero was lost (and removed).
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>crossover:</span>{" "}
                <span className={styles.code}>true</span> or{" "}
                <span className={styles.code}>false</span> depending on whether
                the hero has used a portal and can now be used in both the
                center area and the multiverse.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>cooldown:</span>{" "}
                <span className={styles.code}>0</span>,{" "}
                <span className={styles.code}>1</span>, or
                <span className={styles.code}>2</span> equal to the number of turns the hero has left on cooldown.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>area:</span>{" "}
                <span className={styles.code}>AVX</span> or
                <span className={styles.code}>MULTIVERSE</span> depending on which section of the map the hero starts in. There is no reason to edit this and may cause issues if modified.
              </div>
            </div>
          </HelpSection>
        </div>
      </DebuggingModal>
    </div>
  );
};
