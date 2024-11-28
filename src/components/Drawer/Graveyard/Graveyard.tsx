import { FC, useContext } from "react";
import styles from "./Graveyard.module.scss";
import HeroGrid from "../../HeroGrid/HeroGrid";
import { statusContext } from "../../../StatusContext";
import ResourceInfo from "../ResourceInfo/ResourceInfo";
import SpendButton from "../Button/SpendButton";

const Graveyard: FC = () => {
  const { deadHeroes, isHeroClickable } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className={styles.title}>Lost Heroes</span>
        <HeroGrid
          heroes={deadHeroes}
          heroClass={styles.deadHero}
          conditionalHeroClass={(h) =>
            isHeroClickable(h) ? "clickable-pulse" : ""
          }
        />
      </div>
      <div className={styles.right}>
        <div className={styles.recoverContainer}>
          <ResourceInfo item="RECOVER" />{" "}
          <SpendButton action={"resolvingRecover"} />
        </div>
        <div className={styles.recoverContainer}>
          <ResourceInfo item="RECOVER_F4" />{" "}
          <SpendButton action={"resolvingRecoverF4"} />
        </div>
      </div>
    </div>
  );
};

export default Graveyard;
