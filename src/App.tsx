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

  const debugInfo = {
    currentAction: status.currentAction,
    stackLen: status.stackLen
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
        style={{
          position: "fixed",
          padding: "1rem",
          borderRadius: "0.25rem",
          background: "white",
          color: "#333",
          top: "1rem",
          left: "1rem",
          fontFamily: "monospace",
        }}
      >
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </statusContext.Provider>
  );
}

export default App;
