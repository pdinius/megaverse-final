import { FC, useContext } from "react";
import styles from "./Badges.module.scss";
import timer1 from "../../../../assets/badges/timer-1.png";
import timer2 from "../../../../assets/badges/timer-2.png";
import equipmentBadge from "../../../../assets/badges/equipment.png";
import fantasticFourBadge from "../../../../assets/badges/fantastic-four.png";
import chainedBadge from "../../../../assets/badges/chained.png";
import portalBadge from "../../../../assets/badges/portal.png";
import { statusContext } from "../../../../StatusContext";
import { HeroKey, isFantasticHero } from "../../../../types/heroes";
import { translations } from "../../../../lib/translations";

interface BadgesProps {
  hero: HeroKey;
  cdTimer: number;
}

const Badges: FC<BadgesProps> = ({ hero, cdTimer }) => {
  const { chained, equipment, getHeroesCrossover } = useContext(statusContext);

  const badges: Array<JSX.Element> = [];

  // Cooldown Badge
  if (cdTimer > 0) {
    badges.push(
      <img
        src={cdTimer === 2 ? timer2 : timer1}
        className={styles.badge}
        key="cooldown"
        title={`Ready after ${cdTimer} more fight${cdTimer > 1 ? "s" : ""}.`}
      />
    );
  }

  // Fantastic Four Badge
  if (isFantasticHero(hero)) {
    badges.push(
      <img
        src={fantasticFourBadge}
        className={styles.badge}
        key="f4"
        title="Fantastic Four"
      />
    );
  }

  // Equipment Badge
  if (equipment[hero]?.length) {
    badges.push(
      <img
        src={equipmentBadge}
        className={styles.badge}
        key="equip"
        title={equipment[hero].map((e) => translations[e]).join("\n")}
      />
    );
  }

  // Chained Badge
  if (chained.includes(hero)) {
    badges.push(
      <img
        src={chainedBadge}
        className={styles.badge}
        key="chained"
        title={`${translations[hero]} is required for this fight.`}
      />
    );
  }

  // Portal
  if (getHeroesCrossover().includes(hero)) {
    badges.push(
      <img
        src={portalBadge}
        className={styles.badge}
        key="portal"
        title="Hero may be used in any fight."
      />
    );
  }

  return <div className={styles.container}>{badges}</div>;
};

export default Badges;
