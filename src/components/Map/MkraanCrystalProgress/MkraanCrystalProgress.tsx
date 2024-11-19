import { FC, useContext } from "react";
import styles from "./MkraanCrystalProgress.module.scss";
import { statusContext } from "../../../StatusContext";

const MkraanCrystalProgress: FC = () => {
  const { specialRewards } = useContext(statusContext);

  return (
    <text x={2787} y={1787} className={styles.num}>
      {Math.min(specialRewards.MKRAAN_CRYSTAL, 5)} / 5
    </text>
  );
};

export default MkraanCrystalProgress;
