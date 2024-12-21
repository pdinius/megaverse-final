"use client";

import { useGameStatus } from "./hooks/useGameStatus";
import { statusContext } from "./StatusContext";
import { Map } from "./components/Map/Map";
import Toast from "./components/General/Toast/Toast";
import Modal from "./components/General/Modal/Modal";
import GameSetup from "./components/GameSetup/GameSetup";
import Drawer from "./components/Drawer/Drawer";
import styles from "./App.module.scss";
import { Debugging } from "./components/Debugging/Debugging";

const TESTING = true;

function App() {
  const status = useGameStatus(TESTING);

  return (
    <statusContext.Provider value={status}>
      {status.debugging ? (
        <Debugging />
      ) : (
        <>
          <div className={styles.mapContainer}>
            <Drawer />
            <Map />
          </div>
          <Modal>
            {status.currentAction === "resolvingFight" ? <GameSetup /> : null}
          </Modal>
          <Toast />
          { TESTING ? <pre className={styles.debug}>{status.previousActions.join("\n")}</pre> : null }
        </>
      )}
    </statusContext.Provider>
  );
}

export default App;
