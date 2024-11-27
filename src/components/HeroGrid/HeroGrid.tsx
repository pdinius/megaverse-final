import { FC, useContext } from "react";
import styles from "./HeroGrid.module.scss";
import { HeroKey } from "../../types/heroes";
import HeroIcon from "./HeroIcon/HeroIcon";
import { statusContext } from "../../StatusContext";

interface HeroGridProps {
  heroes: Array<HeroKey>;
  containerClass?: string;
  heroClass?: string;
  conditionalHeroClass?: (h: HeroKey) => string;
  maxRowSize?: number | "auto-fill";
}

const HeroGrid: FC<HeroGridProps> = ({
  heroes,
  containerClass = "",
  heroClass = "",
  conditionalHeroClass = () => "",
  maxRowSize = "auto-fill",
}) => {
  const { isHeroClickable, heroClickHandler } = useContext(statusContext);
  const extraDeadpoolCheck = heroes.includes("DEADPOOL");

  return (
    <div
      className={`${containerClass} ${styles.container}`}
      style={{ gridTemplateColumns: `repeat(${maxRowSize}, 3.5rem)` }}
    >
      {heroes.map((h, i) => (
        <HeroIcon
          key={i}
          hero={h}
          onClick={isHeroClickable(h) ? () => heroClickHandler(h) : undefined}
          className={`${heroClass} ${conditionalHeroClass(h)}`}
          title={
            extraDeadpoolCheck && h === "DEADPOOL_2"
              ? "Also Deadpool 😜"
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default HeroGrid;
