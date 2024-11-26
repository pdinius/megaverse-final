import { FC, useContext } from "react";
import styles from "./HeroIcon.module.scss";
import { statusContext } from "../../../StatusContext";
import { HeroKey } from "../../../types/heroes";
import { heroIconSrcs } from "../../../lib/hero-icons";
import { translations } from "../../../lib/translations";
import Badges from "./Badges/Badges";

interface HeroIconProps {
  hero: HeroKey;
  onClick?: (h: HeroKey) => void;
  className?: string;
}

const HeroIcon: FC<HeroIconProps> = ({ hero, onClick, className = "" }) => {
  const { heroes, chained } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <img
        src={heroIconSrcs[hero]}
        alt={hero}
        title={translations[hero]}
        className={`${styles.icon} ${
          heroes[hero]?.cooldown! === 0 || chained.includes(hero)
            ? ""
            : styles.coolingDown
        } ${className}`}
        onClick={onClick && (() => onClick(hero))}
      />
      <Badges hero={hero} />
    </div>
  );
};

export default HeroIcon;
