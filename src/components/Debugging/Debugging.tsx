import { FC, useContext, useEffect, useState } from "react";
import styles from "./Debugging.module.scss";
import { statusContext } from "../../StatusContext";
import { Icon } from "../General/Icon";
import DebuggingModal from "./DebuggingModal/DebuggingModal";
import ResourceGrid from "./ResourceGrid/ResourceGrid";
import { HelpSection } from "./HelpSection/HelpSection";

const Code = ({ children }: { children: React.ReactNode }) => {
  return <span className={styles.code}>{children}</span>;
};

export const Debugging: FC = () => {
  const {
    currentState,
    loadFromDebugOnClick,
    isLegalStateData,
    toggleDebuggingMode,
  } = useContext(statusContext);
  const [editedState, setEditedState] = useState("");
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  useEffect(() => {
    setEditedState(JSON.stringify(JSON.parse(currentState), null, 2));
  }, [currentState]);

  const toggleInfoModalOpen = (b = !infoModalOpen) => setInfoModalOpen(b);
  const toggleSaveModalOpen = (b = !saveModalOpen) => setSaveModalOpen(b);

  const legal = isLegalStateData(editedState.trim());

  return (
    <div className={styles.container}>
      <button
        className={styles.helpButton}
        onClick={(e) => {
          e.preventDefault();
          toggleInfoModalOpen();
        }}
      >
        <Icon which={"help"} />
      </button>
      <button
        className={styles.exclamationButton}
        onClick={(e) => {
          e.preventDefault();
          toggleSaveModalOpen();
        }}
      >
        <Icon which={"exclamation"} />
      </button>
      <textarea
        value={editedState}
        onChange={(e) => setEditedState(e.target.value)}
      />
      <div className={styles.btns}>
        <button
          disabled={!legal}
          className={`${styles.btn} ${styles.grow2} ${legal ? styles.disabled : ""}`}
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
          className={`${styles.btn} ${styles.grow1} ${styles.cancel}`}
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
      <DebuggingModal isOpen={infoModalOpen} toggleOpen={toggleInfoModalOpen}>
        <div className={styles.debuggingContent}>
          <div className={styles.header}>Editing Megaverse Progress</div>
          <div>
            The text box on this page shows your campaign's progress in JSON
            format. I promise, it's easy to understand even if you don't code
            and haven't heard of JSON before. &#128522;
          </div>
          <div>
            You can always click "cancel" at the bottom to return to the map but
            if you make modifications, you may click "load state" to load
            changes you've made to your progress.
          </div>
          <div>
            All the information is in <Code>item: value</Code> format (e.g.{" "}
            <Code>"KEY": 2</Code> would mean you have 2 key resources). The
            following explains the structure and purpose of each value:
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
                <span className={styles.bold}>dead:</span> <Code>true</Code> or{" "}
                <Code>false</Code> depending on whether the hero was lost (and
                removed).
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>crossover:</span>{" "}
                <Code>true</Code> or <Code>false</Code> depending on whether the
                hero has used a portal and can now be used in both the center
                area and the multiverse.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>cooldown:</span> <Code>0</Code>,{" "}
                <Code>1</Code>, or
                <Code>2</Code> equal to the number of turns the hero has left on
                cooldown.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>area:</span> <Code>AVX</Code> or
                <Code>MULTIVERSE</Code> depending on which section of the map
                the hero starts in. There is no reason to edit this and may
                cause issues if modified.
              </div>
            </div>
          </HelpSection>
          <HelpSection title="equipment">
            Each item in the equipment section is in this format:{" "}
            <Code>"&#123;HERO NAME&#125;": [&#123;EQUIPMENT KEYS&#125;]</Code>.
            The hero names will be in the same format as the those in the heroes
            section. The <Code>EQUIPMENT KEYS</Code> are a comma-separated list
            of keys representing specific equipment. There will also be one
            group of equipment titled <Code>GENERIC</Code> which are, of course,
            the generic equipment that can be used by any hero.
          </HelpSection>
          <HelpSection title="teams">
            A list of keys, each representing an unlocked team.
          </HelpSection>
          <HelpSection title="pets">
            A list of keys, each representing an unlocked pet.
          </HelpSection>
          <HelpSection title="misc">
            A list of keys, each representing a miscellaneous reward, primarily
            elements of the symbiote promo deck.
          </HelpSection>
          <HelpSection title="specialRewards">
            Each item in this section shows the amount of special rewards you
            have available (e.g. uses of the Danger Room or Camp Hammond.)
            Notable, the heart symbols on the map give you a{" "}
            <Code>RECOVER</Code> which is what lets you recover lost heroes, and
            similarly the <Code>RECOVER_F4</Code> lets you recover heroes with
            the Fantastic Four tag.
          </HelpSection>
          <HelpSection title="infinityStones">
            A list of keys, each representing an infinity stone. They are all in
            the format <Code>INFINITY_&#123;COLOR&#125;</Code> where{" "}
            <Code>COLOR</Code> is either <Code>RED</Code>, <Code>ORANGE</Code>,{" "}
            <Code>YELLOW</Code>, <Code>GREEN</Code>, <Code>BLUE</Code>, or{" "}
            <Code>PURPLE</Code>. Adding or removing values from this list could
            have unexpected or unwanted results.
          </HelpSection>
          <HelpSection title="completedBtns">
            A list of IDs for different unlocked gates and completed fights.
            Probably best to leave this alone.
          </HelpSection>
          <HelpSection title="connectedPaths">
            Similar to above but for paths in between fights and gates. Again,
            adding and removing values is not recommended.
          </HelpSection>
          <HelpSection title="achievements">
            Each item in this section tracks whether you've completed certain
            requirements that unlock resources, action tokens, and sometimes
            even paths and gates. The name of each achievement should hopefully
            be clear and you should feel free to mark some as <Code>true</Code>{" "}
            if you completed a game where you fulfilled one of these and didn't
            see the expected result.
          </HelpSection>
          <HelpSection title="counts">
            Each item in this section represents the number of times you've
            completed an action that is considered somewhere on the map:
            <div className={styles.block}>
              <div className={styles.subItem}>
                <span className={styles.bold}>bolts:</span> The number of
                lightning bolt resources unlocked for the gate in the MIST area.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>portals:</span> The number of
                portals unlocked for the "8 PORTALS" gate in the MIDNIGHT area.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>stars:</span> The number of stars
                unlocked for the "6 STARS" gates in the WAR area and the "12
                STARS" gate in the EXILE area.
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>collector_items:</span> The number
                of items purchased from The Collector in the GALAXY are in order
                to make the price of the next item match the list (e.g., if this
                number were 3, then the price to buy the next item is 1 key, as
                it would be the 4th item.)
              </div>
              <div className={styles.subItem}>
                <span className={styles.bold}>maple:</span> The number of Alpha
                Flight heroes you've won with. This is just to keep track of how
                many of the maple leaves in the center area to put check marks
                next to. It has no bearing on your actual resources or progress.
              </div>
            </div>
          </HelpSection>
        </div>
      </DebuggingModal>
      <DebuggingModal isOpen={saveModalOpen} toggleOpen={toggleSaveModalOpen} danger>
        <div className={styles.debuggingContent}>
          <div className={styles.block}>
            <span className={styles.bold}>NOTE:</span> While your progress is saved in your browser's local storage,
            feel free to copy the entire text on this page into a file on your
            computer and then paste it in if you switch computers, browsers, or
            just lose your progress for one reason another, and you can pick up
            where you left off.
          </div>
        </div>
      </DebuggingModal>
    </div>
  );
};
