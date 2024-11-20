import { FC, useContext } from "react";
import styles from "./Graveyard.module.scss";
import HeroGrid from "../../HeroGrid/HeroGrid";
import { statusContext } from "../../../StatusContext";
import ResourceInfo from "../ResourceInfo/ResourceInfo";

const Graveyard: FC = () => {
  const { recoverHero, heroesDead, canRecover } =
    useContext(statusContext);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.title}>Lost Heroes</span>
        <HeroGrid
          heroes={heroesDead}
          heroClass={styles.deadHero}
          clickHandler={(h) => () => {
            if (canRecover(h)) {
              recoverHero(h);
            }
          }}
          conditionalHeroClasses={[
            {
              fn: canRecover,
              c: "clickable-pulse",
            },
          ]}
        />
      </div>
      <div className={styles.right}>
        <ResourceInfo t="RECOVER" />
        <ResourceInfo t="RECOVER_F4" />
      </div>
    </div>
  );
};

export default Graveyard;
