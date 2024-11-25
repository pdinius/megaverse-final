import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./Drawer.module.scss";
import Divider from "./Divider";
import ScoreAndSpecial from "./ScoreAndSpecial/ScoreAndSpecial";
import DrawerContainer from "./DrawerContainer/DrawerContainer";
import Handle from "./Handle/Handle";
import Graveyard from "./Graveyard/Graveyard";
import UndoButton from "./Button/UndoButton";
import ResetButton from "./Button/ResetButton";
import { statusContext } from "../../StatusContext";
import { DRAWER_ACTIONS } from "../../types/game-status";
import Resources from "./Resources/Resources";
import UnlockedHeroes from "./UnlockedHeroes/UnlockedHeroes";

const Drawer: FC = () => {
  const { currentAction, areHeroesDead, drawerOpen, toggleDrawerOpen } =
    useContext(statusContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateYamt, setTranslateYamt] = useState(999);

  useEffect(() => {
    if (window === undefined) return;
    const updateDrawerHeight = () => {
      if (containerRef.current === null) return;
      setTranslateYamt(containerRef.current.getBoundingClientRect().height);
    };
    updateDrawerHeight();
    window.addEventListener("resize", updateDrawerHeight);
    return () => {
      window.removeEventListener("resize", updateDrawerHeight);
    };
  }, [containerRef.current?.getBoundingClientRect().height]);

  useEffect(() => {
    if (DRAWER_ACTIONS.includes(currentAction)) {
      toggleDrawerOpen(true);
    }
  }, [currentAction]);

  return (
    <>
      <div
        className={styles.container}
        style={{
          transform: drawerOpen ? "none" : `translateY(-${translateYamt}px)`,
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
        <Handle top={translateYamt} />
      </div>
    </>
  );
};

export default Drawer;
