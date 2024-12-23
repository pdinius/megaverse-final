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
import Handle from "./Handle";
import SaveLoadButton from "./Button/SaveLoadButton";
import { If } from "../General/If/If";

const Drawer: FC = () => {
  const { areHeroesDead, drawerOpen } = useContext(statusContext);
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
              <SaveLoadButton />
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
          <If condition={areHeroesDead}>
            <Divider />
            <Graveyard />
          </If>
        </div>
      </div>
      <Handle />
    </div>
  );
};

export default Drawer;
