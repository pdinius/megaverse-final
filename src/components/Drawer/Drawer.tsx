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
  const { currentAction, heroesDead } = useContext(statusContext);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateYamt, setTranslateYamt] = useState(999);

  useEffect(() => {
    if (containerRef.current === null) return;
    setTranslateYamt(containerRef.current.offsetHeight);
  }, [containerRef.current?.offsetHeight]);

  useEffect(() => {
    if (DRAWER_ACTIONS.includes(currentAction)) {
      setIsOpen(true);
    }
  }, [currentAction]);

  return (
    <div
      className={styles.container}
      style={{ transform: isOpen ? "none" : `translateY(-${translateYamt}px)` }}
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
      {heroesDead.length > 0 ? (
        <>
          <Divider />
          <Graveyard />
        </>
      ) : null}
      <Handle onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default Drawer;
