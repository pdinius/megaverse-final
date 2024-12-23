import { FC, useState } from "react";
import styles from "./Challenge.module.scss";
import { Challenge as ChallengeType } from "../../../../lib/villain-info";
import challengeIcon from "../../../../assets/challenge.png";
import { challengeSrcs } from "../../../../lib/challenge-images";
import { If } from "../../../General/If/If";

interface ChallengeProps {
  challenges?: Array<ChallengeType>;
}

export const Challenge: FC<ChallengeProps> = ({ challenges }) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <If condition={challenges !== undefined}>
      <div className={styles.container}>
        <img
          className={styles.icon}
          src={challengeIcon}
          onMouseOver={() => setShowCard(true)}
          onMouseOut={() => setShowCard(false)}
        />
        <div className={styles.cardContainer}>
          {challenges!.map((c, i) => (
            <img
              key={i}
              src={challengeSrcs[c]}
              className={styles.card}
              style={{ opacity: showCard ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </If>
  );
};
