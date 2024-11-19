import { FC, useContext } from "react";
import styles from "./Graveyard.module.scss";
import HeroGrid from "../../HeroGrid/HeroGrid";
import { statusContext } from "../../../StatusContext";

const Graveyard: FC = () => {
  const { recoverHero, heroesDead, canRecover } = useContext(statusContext);

  return (
    <div className={styles.container}>
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
  );
};

export default Graveyard;
