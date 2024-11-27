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
  title?: string;
}

const HeroIcon: FC<HeroIconProps> = ({
  hero,
  onClick,
  className = "",
  title = translations[hero],
}) => {
  const { heroes, chained } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <img
        src={heroIconSrcs[hero]}
        alt={hero}
        title={title}
        className={`${styles.icon} ${
          chained.includes(hero) || heroes[hero]!.cooldown === 0
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
