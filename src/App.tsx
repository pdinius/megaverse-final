"use client";

import { useGameStatus } from "./hooks/useGameStatus";
import { statusContext } from "./StatusContext";
import { Map } from "./components/Map/Map";
import Toast from "./components/General/Toast/Toast";
import Modal from "./components/General/Modal/Modal";
import GameSetup from "./components/GameSetup/GameSetup";

function App() {
  const status = useGameStatus();
  const closeModal =
    status.currentAction !== "choosingDeadpoolVictim"
      ? status.endFight
      : () => {};

  return (
    <statusContext.Provider value={status}>
      <Map />
      <Modal isOpen={status.modalOpen} toggleOpen={closeModal}>
        <GameSetup closeModal={closeModal} />
      </Modal>
      <Toast />
    </statusContext.Provider>
  );
}

export default App;
