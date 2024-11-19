import { FC, useContext } from "react";
import styles from "./SpecialLocations.module.scss";
import location from "../../../../assets/icons/locations.png";
import upperStyles from "../ScoreAndSpecial.module.scss";
import { statusContext } from "../../../../StatusContext";

interface SpecialLocationsProps {}

const SpecialLocations: FC<SpecialLocationsProps> = () => {
  const { specialRewards } = useContext(statusContext);

  const LocationRow = (n: number, s: string) => {
    return (
      <span className={n ? "" : styles.transparent}>
        {s} &times; {n}
      </span>
    );
  };

  return (
    <div className={upperStyles.item}>
      <img
        src={location}
        className={
          specialRewards.DANGER_ROOM === 0 && specialRewards.CAMP_HAMMOND === 0
            ? styles.transparent
            : ""
        }
      />
      <div className={styles.infoContainer}>
        {LocationRow(specialRewards.CAMP_HAMMOND, "Camp Hammond")}
        {LocationRow(specialRewards.DANGER_ROOM, "Danger Room")}
      </div>
    </div>
  );
};

export default SpecialLocations;
