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

  const debugInfo = {
    heroes: status.heroes
  };

  return (
    <statusContext.Provider value={status}>
      <Map />
      <Drawer />
      <Modal>
        <GameSetup />
      </Modal>
      <Toast />
      <pre
        className={styles.debug}
      >
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </statusContext.Provider>
  );
}

export default App;
