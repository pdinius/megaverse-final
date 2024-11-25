import { FC, useContext } from "react";
import styles from "../VillainOverlays/VillainOverlays.module.scss";
import { statusContext } from "../../../StatusContext";

const Achievements: FC = () => {
  const { getAchievementSVGPathStrings } = useContext(statusContext);

  return getAchievementSVGPathStrings().map((d, i) => (
    <path key={i} d={d} className={styles.checkmark} />
  ));
};

export default Achievements;
