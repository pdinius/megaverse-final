import { FC, MouseEventHandler, useContext } from "react";
import styles from "./HeroIcon.module.scss";
import { statusContext } from "../../../StatusContext";
import { HeroKey } from "../../../types/heroes";
import { heroIconSrcs } from "../../../lib/hero-icons";
import { translations } from "../../../lib/translations";
import Badges from "./Badges/Badges";

interface HeroIconProps {
  hero: HeroKey;
  onClick?: MouseEventHandler;
  className?: string;
}

const HeroIcon: FC<HeroIconProps> = ({ hero, onClick, className = "" }) => {
  const { cooldown } = useContext(statusContext);

  const cd = cooldown.findIndex((cd) => cd.includes(hero)) + 1;

  return (
    <div className={styles.container}>
      <img
        src={heroIconSrcs[hero]}
        alt={hero}
        title={translations[hero]}
        className={`${styles.icon} ${
          cd > 0 ? styles.coolingDown : ""
        } ${className}`}
        onClick={onClick}
      />
      <Badges hero={hero} cdTimer={cd} />
    </div>
  );
};

export default HeroIcon;
