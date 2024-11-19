import { FC } from "react";
import Score from "./Score";
import Portals from "./Portals";
import MkraanCrystals from "./MkraanCrystals";
import ActionTokens from "./ActionTokens";
import InfinityStatus from "./InfinityStatus";
import SpecialLocations from "./SpecialLocations";
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
