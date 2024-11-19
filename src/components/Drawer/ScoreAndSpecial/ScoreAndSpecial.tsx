import { FC } from "react";
import Score from "./Score/Score";
import Portals from "./Portals/Portals";
import MkraanCrystals from "./MkraanCrystals/MkraanCrystals";
import ActionTokens from "./ActionTokens/ActionTokens";
import InfinityStatus from "./InfinityStatus/InfinityStatus";
import SpecialLocations from "./SpecialLocations/SpecialLocations";
import styles from "./ScoreAndSpecial.module.scss";

const ScoreAndSpecial: FC = () => {
  return (
    <div className={styles.container}>
      <Score />
      <MkraanCrystals />
      <InfinityStatus />
      <Portals />
      <ActionTokens />
      <SpecialLocations />
    </div>
  );
};

export default ScoreAndSpecial;
