import { FC, useContext } from "react";
import styles from "./UnlockedHeroes.module.scss";
import HeroGrid from "../HeroGrid/HeroGrid";
import portal from "@/assets/icons/portal.png";
import DrawerContainer from "./DrawerContainer";
import { statusContext } from "@/app/page";
import BackgroundImage from "../BackgroundImage";
import { HeroKey } from "@/app/types/hero";

const UnlockedHeroes: FC = () => {
  const {
    getHeroesAvX,
    getHeroesCrossover,
    getHeroesMultiverse,
    heroesDead,
    unlockedHeroesClickHandler,
  } = useContext(statusContext);

  const conditionalHeroClasses = [
    {
      fn: (h: HeroKey) => Boolean(unlockedHeroesClickHandler(h)),
      c: "clickable-pulse",
    },
  ];

  return (
    <DrawerContainer className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Avengers & X-Men</div>
        <HeroGrid
          containerClass={styles.avxContainer}
          heroes={getHeroesAvX()}
          clickHandler={unlockedHeroesClickHandler}
          conditionalHeroClasses={conditionalHeroClasses}
        />
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Crossover</div>
        <div className={styles.portalContainer}>
          <BackgroundImage src={portal.src} />
          <HeroGrid
            containerClass={styles.portalGrid}
            heroes={getHeroesCrossover()}
            clickHandler={unlockedHeroesClickHandler}
            conditionalHeroClasses={conditionalHeroClasses}
          />
        </div>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.title}>Multiverse</div>
        <HeroGrid
          containerClass={styles.multiverseContainer}
          heroes={getHeroesMultiverse()}
          clickHandler={unlockedHeroesClickHandler}
          conditionalHeroClasses={conditionalHeroClasses}
        />
      </div>
    </DrawerContainer>
  );
};

export default UnlockedHeroes;
