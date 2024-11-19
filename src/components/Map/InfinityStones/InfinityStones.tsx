import { FC, useContext } from "react";
import { InfinityStone } from "../../../types/general";
import { statusContext } from "../../../StatusContext";
import styles from "./InfinityStones.module.scss";
import red from "../../../assets/rewards/infinity-stones/infinity-red.png";
import orange from "../../../assets/rewards/infinity-stones/infinity-orange.png";
import yellow from "../../../assets/rewards/infinity-stones/infinity-yellow.png";
import green from "../../../assets/rewards/infinity-stones/infinity-green.png";
import blue from "../../../assets/rewards/infinity-stones/infinity-blue.png";
import purple from "../../../assets/rewards/infinity-stones/infinity-purple.png";

const INFINITY_COORDINATES = [
  { x: 3953, y: 5924 },
  { x: 3964, y: 5771 },
  { x: 4058, y: 5648 },
  { x: 4222, y: 5599 },
  { x: 4395, y: 5648 },
  { x: 4492, y: 5772 },
];

const infinitySrcs: { [key in InfinityStone]: string } = {
  INFINITY_RED: red,
  INFINITY_ORANGE: orange,
  INFINITY_YELLOW: yellow,
  INFINITY_GREEN: green,
  INFINITY_BLUE: blue,
  INFINITY_PURPLE: purple,
};

const InfinityStones: FC = () => {
  const { infinityStones } = useContext(statusContext);

  return infinityStones.map((s, i) => (
    <image
      key={i}
      href={infinitySrcs[s]}
      className={styles.stone}
      {...INFINITY_COORDINATES[i]}
    />
  ));
};

export default InfinityStones;
