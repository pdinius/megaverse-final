import { FC, useContext, useEffect } from "react";
import styles from "./Resources.module.scss";
import { statusContext } from "@/app/page";
import { Tag } from "@/app/types/rewards";
import CHOICE from "@/assets/icons/choice.png";
import BOLT from "@/assets/icons/bolt.png";
import BRAIN from "@/assets/icons/brain.png";
import CHIMI from "@/assets/icons/chimi.png";
import DNA from "@/assets/icons/dna.png";
import EYE from "@/assets/icons/eye.png";
import FLAG from "@/assets/icons/flag.png";
import MAGIC from "@/assets/icons/magic.png";
import GEAR from "@/assets/icons/gear.png";
import HOURGLASS from "@/assets/icons/hourglass.png";
import KEY from "@/assets/icons/key.png";
import MAPLE from "@/assets/icons/maple.png";
import PLANET from "@/assets/icons/planet.png";
import PUZZLE from "@/assets/icons/puzzle.png";
import STAR from "@/assets/icons/star.png";
import SPARKLE from "@/assets/icons/sparkle.png";
import SpendButton from "./SpendButton";

const iconSrcs: { [key in Tag]: string } = {
  BOLT: BOLT.src,
  BRAIN: BRAIN.src,
  CHIMI: CHIMI.src,
  CHOICE: CHOICE.src,
  DNA: DNA.src,
  EYE: EYE.src,
  FLAG: FLAG.src,
  MAGIC: MAGIC.src,
  GEAR: GEAR.src,
  HOURGLASS: HOURGLASS.src,
  KEY: KEY.src,
  MAPLE: MAPLE.src,
  PLANET: PLANET.src,
  PUZZLE: PUZZLE.src,
  STAR: STAR.src,
  SPARKLE: SPARKLE.src,
};

const RESOURCE_LIST: Array<Tag> = [
  "BOLT",
  "BRAIN",
  "CHIMI",
  "CHOICE",
  "DNA",
  "EYE",
  "FLAG",
  "MAGIC",
  "GEAR",
  "HOURGLASS",
  "KEY",
  "MAPLE",
  "PLANET",
  "PUZZLE",
  "STAR",
  "SPARKLE",
];

const Resources: FC = () => {
  const { tags, tagClickHandler } = useContext(statusContext);

  return RESOURCE_LIST.map((t, i) => {
    const qtx = tags[t];
    const clickHandler = tagClickHandler(t);

    return (
      <div
        key={i}
        className={`${styles.resourceContainer} ${
          qtx > 0 || clickHandler ? "" : styles.transparent
        }`}
      >
        <img
          src={iconSrcs[t]}
          className={`${styles.resourceIcon} ${
            clickHandler ? "clickable-pulse" : ""
          }`}
          onClick={clickHandler}
        />
        <span className={styles.qtx}>{qtx}</span>
      </div>
    );
  });
};

export default Resources;
