"use client";

import { useGameStatus } from "./hooks/useGameStatus";
import { statusContext } from "./StatusContext";
import { Map } from "./components/Map/Map";
import Toast from "./components/General/Toast/Toast";
import Modal from "./components/General/Modal/Modal";
import GameSetup from "./components/GameSetup/GameSetup";
import Drawer from "./components/Drawer/Drawer";

function App() {
  const status = useGameStatus();

  return (
    <statusContext.Provider value={status}>
      <Map />
      <Drawer />
      <Modal>
        <GameSetup />
      </Modal>
      <Toast />
      <div
        style={{
          position: "fixed",
          padding: "1rem",
          borderRadius: "0.25rem",
          background: "white",
          color: "#333",
          top: "1rem",
          left: "1rem",
          fontFamily: "Figtree",
        }}
      >
        "{status.currentAction}"
      </div>
    </statusContext.Provider>
  );
}

export default App;
