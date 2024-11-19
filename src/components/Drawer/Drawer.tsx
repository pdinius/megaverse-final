import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "./Drawer.module.scss";
import Divider from "./Divider";
import UnlockedHeroes from "./UnlockedHeroes";
import Resources from "./Resources";
import ScoreAndSpecial from "./ScoreAndSpecial/ScoreAndSpecial";
import DrawerContainer from "./DrawerContainer";
import Handle from "./Handle";
import Graveyard from "./Graveyard";
import UndoButton from "./UndoButton";
import { statusContext } from "@/app/page";
import ResetButton from "./ResetButton";
import { DRAWER_ACTIONS } from "@/types/GameStatus";

const Drawer: FC = () => {
  const { currentAction, heroesDead } = useContext(statusContext);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (DRAWER_ACTIONS.includes(currentAction)) {
      setIsOpen(true);
    }
  }, [currentAction]);

  return (
    <div
      className={styles.container}
      style={{ transform: isOpen ? "none" : `translateY(-${containerRef.current?.offsetHeight || 999}px)` }}
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
      <DrawerContainer
        className={styles.resourceGridContainer}
      >
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
