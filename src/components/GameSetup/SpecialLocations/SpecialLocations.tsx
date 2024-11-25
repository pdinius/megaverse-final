import { FC, useContext } from "react";
import styles from "./SpecialLocations.module.scss";
import { statusContext } from "../../../StatusContext";

interface SpecialLocationsProps {}

const SpecialLocations: FC<SpecialLocationsProps> = () => {
  const {
    specialRewards,
    toggleCampHammond,
    toggleDangerRoom,
    usingCampHammond,
    usingDangerRoom,
  } = useContext(statusContext);

  return specialRewards.DANGER_ROOM || specialRewards.CAMP_HAMMOND ? (
    <div className={styles.container}>
      {specialRewards.CAMP_HAMMOND ? (
        <button
          className={`${styles.btn} ${usingCampHammond ? styles.active : ""}`}
          onClick={toggleCampHammond}
        >
          Use Camp Hammond
        </button>
      ) : null}
      {specialRewards.DANGER_ROOM ? (
        <button
          className={`${styles.btn} ${usingDangerRoom ? styles.active : ""}`}
          onClick={toggleDangerRoom}
        >
          Use Danger Room
        </button>
      ) : null}
    </div>
  ) : null;
};

export default SpecialLocations;
