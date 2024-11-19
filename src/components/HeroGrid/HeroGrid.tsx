import { FC } from "react";
import styles from "./HeroGrid.module.scss";
import { HeroKey } from "../../types/heroes";
import HeroIcon from "./HeroIcon/HeroIcon";

interface HeroGridProps {
  heroes: Array<HeroKey>;
  containerClass?: string;
  heroClass?: string;
  clickHandler?: (h: HeroKey) => void;
  conditionalHeroClasses?: Array<{
    fn: (h: HeroKey) => boolean;
    c: string;
  }>;
  maxRowSize?: number | "auto-fill";
}

const HeroGrid: FC<HeroGridProps> = ({
  heroes,
  containerClass = "",
  heroClass = "",
  clickHandler,
  conditionalHeroClasses = [],
  maxRowSize = "auto-fill",
}) => {
  return (
    <div
      className={`${containerClass} ${styles.container}`}
      style={{ gridTemplateColumns: `repeat(${maxRowSize}, 3.5rem)` }}
    >
      {heroes.map((h, i) => (
        <HeroIcon
          key={i}
          hero={h}
          onClick={() => clickHandler && clickHandler(h)}
          className={`${heroClass} ${conditionalHeroClasses
            .map(({ fn, c }) => (fn(h) ? c : ""))
            .join(" ")}`}
        />
      ))}
    </div>
  );
};

export default HeroGrid;
