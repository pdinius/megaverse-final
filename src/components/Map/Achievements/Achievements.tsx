import { FC, useContext, useEffect, useState } from "react";
import styles from "../VillainOverlays/VillainOverlays.module.scss";
import { statusContext } from "../../../StatusContext";
import {
  achievementPaths,
  achievementToKeyLookup,
} from "../../../lib/achievements";

const BOLT_GATES = [
  "MIST_GATE_7",
  "MIST_GATE_8",
  "MIST_GATE_23",
  "MIST_GATE_24",
  "MIST_GATE_25",
  "MIST_GATE_26",
  "MIST_GATE_27",
  "MIST_GATE_28",
  "MIST_GATE_29",
];

const Achievements: FC = () => {
  const { achievements, completed, recruitedHeroes } =
    useContext(statusContext);
  const [achievementPathKeys, setAchievementPathKeys] = useState<
    Array<keyof typeof achievementPaths>
  >([]);

  useEffect(() => {
    const newAchievementPathKeys: Array<keyof typeof achievementPaths> = [];

    Object.keys(achievementPaths).forEach((k) => {
      const key = k as keyof typeof achievementPaths;

      let maples: number;
      let req: number;

      switch (key) {
        case "AVX_MAPLE_1":
        case "AVX_MAPLE_2":
        case "AVX_MAPLE_3":
        case "AVX_MAPLE_4":
          maples = [
            achievements.win_with_guardian,
            achievements.win_with_puck,
            achievements.win_with_sasquatch,
            achievements.win_with_snowbird,
            achievements.win_with_northstar,
          ].filter((v) => v).length;
          req = Number(key.slice(-1));
          if (maples < req) return null;
          break;
        case "STARS_BROOD_QUEEN":
          if (!completed.includes("AVX_BROOD_QUEEN_144")) return null;
          break;
        default:
          if (!achievements[achievementToKeyLookup[key]!]) return null;
      }

      // HULKLING / NOVA
      if (
        key === "GALAXY_ROSTER_HULKLING" &&
        !Object.values(recruitedHeroes).flat().includes("HULKLING")
      ) {
        return;
      }
      if (
        key === "GALAXY_ROSTER_NOVA" &&
        !Object.values(recruitedHeroes).flat().includes("NOVA")
      ) {
        return;
      }

      // BOLTS
      if (
        key === "MIST_BOLTS" &&
        !BOLT_GATES.every((bp) => completed.includes(bp))
      ) {
        return;
      }

      // 8 PORTALS
      if (key === "MIDNIGHT_8_GATES" && achievements.total_portals < 8) {
        return;
      }

      // 6 STARS
      if (
        (key === "WAR_6_STARS_LEFT" || key === "WAR_6_STARS_RIGHT") &&
        achievements.total_stars < 6
      ) {
        return;
      }

      // 12 STARS
      if (key === "EXILE_12_STARS" && achievements.total_stars < 12) {
        return;
      }

      newAchievementPathKeys.push(key);
    });

    setAchievementPathKeys(newAchievementPathKeys);
  }, [achievements, completed, recruitedHeroes]);

  return achievementPathKeys.map((key) => (
    <path key={key} d={achievementPaths[key]} className={styles.checkmark} />
  ));
};

export default Achievements;
