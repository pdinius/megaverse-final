import { FC, useContext } from "react";
import styles from "./SpecialLocations.module.scss";
import location from "@/assets/icons/locations.png";
import upperStyles from "./ScoreAndSpecial.module.scss";
import { statusContext } from "@/app/page";

interface SpecialLocationsProps {}

const SpecialLocations: FC<SpecialLocationsProps> = () => {
  const { specialRewards } = useContext(statusContext);

  return (
    <div className={upperStyles.item}>
      <img src={location.src} />
      <div className={styles.infoContainer}>
        <span>Camp Hammond &times; {specialRewards.CAMP_HAMMOND}</span>
        <span>Danger Room &times; {specialRewards.DANGER_ROOM}</span>
      </div>
    </div>
  );
};

export default SpecialLocations;
