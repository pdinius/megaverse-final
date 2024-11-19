import { FC, useContext } from "react";
import styles from "./InfinityStatus.module.scss";
import upperStyles from "../ScoreAndSpecial.module.scss";
import gauntlet from "../../../../assets/icons/gauntlet.png";
import { statusContext } from "../../../../StatusContext";

interface InfinityStatusProps {}

const InfinityStatus: FC<InfinityStatusProps> = () => {
  const { infinityStones } = useContext(statusContext);

  return (
    <div className={upperStyles.item} title="Infinity Stones">
      <div className={styles.stoneContainer}>
        <img src={gauntlet} />
        <div className={styles.sheen} />
      </div>
      <span className={styles.infinityText}>{infinityStones.length}</span>
    </div>
  );
};

export default InfinityStatus;
