"use client";

import { useGameStatus } from "./hooks/useGameStatus";
import { statusContext } from "./StatusContext";

function App() {
  const status = useGameStatus();

  return <statusContext.Provider value={status}>
    
  </statusContext.Provider>;
}

export default App;
