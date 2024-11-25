import { FC, useContext } from "react";
import styles from "./UnlockedHeroes.module.scss";
import portal from "../../../assets/icons/portal.png";
import { statusContext } from "../../../StatusContext";
import DrawerContainer from "../DrawerContainer/DrawerContainer";
import HeroGrid from "../../HeroGrid/HeroGrid";
import BackgroundImage from "../../General/BackgroundImage/BackgroundImage";
import { HeroKey } from "../../../types/heroes";

const UnlockedHeroes: FC = () => {
  const { avxHeroes, multiverseHeroes, crossoverHeroes, isHeroClickable } =
    useContext(statusContext);
  const conditionalHeroClass = (h: HeroKey) =>
    isHeroClickable(h) ? "clickable-pulse" : "";

  return (
    <DrawerContainer className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Avengers & X-Men</div>
        <HeroGrid
          containerClass={styles.avxContainer}
          heroes={avxHeroes}
          conditionalHeroClass={conditionalHeroClass}
        />
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Crossover</div>
        <div className={styles.portalContainer}>
          <BackgroundImage src={portal} />
          <HeroGrid
            containerClass={styles.portalGrid}
            heroes={crossoverHeroes}
            conditionalHeroClass={conditionalHeroClass}
          />
        </div>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Multiverse</div>
        <HeroGrid
          containerClass={styles.multiverseContainer}
          heroes={multiverseHeroes}
          conditionalHeroClass={conditionalHeroClass}
        />
      </div>
    </DrawerContainer>
  );
};

export default UnlockedHeroes;
