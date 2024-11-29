"use client";

import { useGameStatus } from "./hooks/useGameStatus";
import { statusContext } from "./StatusContext";
import { Map } from "./components/Map/Map";
import Toast from "./components/General/Toast/Toast";
import Modal from "./components/General/Modal/Modal";
import GameSetup from "./components/GameSetup/GameSetup";
import Drawer from "./components/Drawer/Drawer";
import styles from "./App.module.scss";

function App() {
  const status = useGameStatus();

  return (
    <statusContext.Provider value={status}>
      <div className={styles.mapContainer}>
        <Drawer />
        <Map />
      </div>
      <Modal>
        {status.currentAction === "resolvingFight" ? <GameSetup /> : null}
      </Modal>
      <Toast />
    </statusContext.Provider>
  );
}

export default App;
