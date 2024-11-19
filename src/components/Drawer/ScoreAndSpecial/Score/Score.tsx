import { FC, useContext } from "react";
import styles from "./Score.module.scss";
import trophy from "../../../../assets/icons/trophy.png";
import star from "../../../../assets/star.png";
import upperStyles from "../ScoreAndSpecial.module.scss";
import { statusContext } from "../../../../StatusContext";

const Score: FC = () => {
  const { score } = useContext(statusContext);

  return (
    <div className={upperStyles.item} title="Score">
      <img src={trophy} className={styles.trophy} />
      <img src={star} className={styles.trophyStar} />
      <span className={styles.scoreText}>{score}</span>
    </div>
  );
};

export default Score;
