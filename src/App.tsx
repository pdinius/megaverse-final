"use client";

import { useGameStatus } from "./hooks/useGameStatus";
import { statusContext } from "./StatusContext";
import { Map } from "./components/Map/Map";

function App() {
  const status = useGameStatus();

  return (
    <statusContext.Provider value={status}>
      <Map />
    </statusContext.Provider>
  );
}

export default App;
