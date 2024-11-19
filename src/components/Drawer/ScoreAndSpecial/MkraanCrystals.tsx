import { FC, useContext } from "react";
import styles from "./MkraanCrystals.module.scss";
import upperStyles from "./ScoreAndSpecial.module.scss";
import mkraan from "@/assets/icons/mkraan-crystal.png";
import { statusContext } from "@/app/page";

const MkraanCrystals: FC = () => {
  const { specialRewards } = useContext(statusContext);

  return (
    <div className={upperStyles.item} title="M'kraan Crystal">
      <img src={mkraan.src} className={styles.mkraanCrystal} />
      <span className={styles.mkraanText}>{specialRewards.MKRAAN_CRYSTAL}</span>
    </div>
  );
};

export default MkraanCrystals;
