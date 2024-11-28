import { FC, useContext, useRef } from "react";
import styles from "./Drawer.module.scss";
import Divider from "./Divider";
import ScoreAndSpecial from "./ScoreAndSpecial/ScoreAndSpecial";
import DrawerContainer from "./DrawerContainer/DrawerContainer";
import Graveyard from "./Graveyard/Graveyard";
import UndoButton from "./Button/UndoButton";
import ResetButton from "./Button/ResetButton";
import { statusContext } from "../../StatusContext";
import Resources from "./Resources/Resources";
import UnlockedHeroes from "./UnlockedHeroes/UnlockedHeroes";
import { Icon } from "../General/Icon";
import { TypedEntries } from "../../lib/utils";

const Drawer: FC = () => {
  const { areHeroesDead, drawerOpen, toggleDrawerOpen, score, tags } =
    useContext(statusContext);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <div
        className={styles.contentContainer}
        style={{
          height: drawerOpen
            ? `${containerRef.current?.clientHeight}px`
            : "0px",
          pointerEvents: drawerOpen ? "revert" : "none",
        }}
      >
        <div
          className={styles.content}
          style={{
            opacity: drawerOpen ? 1 : 0,
          }}
          ref={containerRef}
        >
          <DrawerContainer className={styles.scoreAndSpecialContainer}>
            <ScoreAndSpecial />
            <div className={styles.btnContainer}>
              <UndoButton />
              <ResetButton />
            </div>
          </DrawerContainer>
          <Divider />
          <DrawerContainer className={styles.resourceGridContainer}>
            <Resources />
          </DrawerContainer>
          <Divider />
          <UnlockedHeroes />
          {areHeroesDead ? (
            <>
              <Divider />
              <Graveyard />
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.handle}>
        <div
          className={styles.handleInfo}
          style={{
            opacity: drawerOpen ? 0 : 1,
            padding: drawerOpen ? "0rem" : "0.5rem 1rem",
            width: drawerOpen ? "0px" : "calc(100vw - 3rem)",
          }}
        >
          <div>
            <Icon which="trophy" className={styles.trophyIcon} /> {score}
          </div>
          <div className={styles.tags}>
            {TypedEntries(tags).map(([t, v]) =>
              v > 0 ? (
                <Icon key={t} which={t} className={styles.infoIcon} />
              ) : null
            )}
          </div>
        </div>
        <button
          className={styles.openButton}
          style={{
            width: drawerOpen ? "100vw" : "3rem",
            borderLeft: drawerOpen ? "1px dashed #fff" : "1px dashed #aaa",
          }}
          onClick={() => toggleDrawerOpen()}
        >
          <Icon which="bars" className={styles.bars} />
        </button>
      </div>
    </div>
  );
};

export default Drawer;
