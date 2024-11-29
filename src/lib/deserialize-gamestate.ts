/* eslint-disable @typescript-eslint/no-explicit-any */
import { EQUIP_LIST, EquipKey } from "../types/equipment";
import {
  Achievement,
  ACHIEVEMENT_LIST,
  Counts,
  HeroState,
} from "../types/game-status";
import {
  ActionType,
  INFINITY_STONES,
  InfinityStone,
  SpecialReward,
  Tag,
} from "../types/general";
import { HERO_LIST, HeroKey } from "../types/heroes";
import { MISC_LIST, MiscKey } from "../types/misc";
import { PET_LIST, PetKey } from "../types/pets";
import { TEAM_LIST, TeamKey } from "../types/teams";
import { combinedButtons, combinedPaths } from "./svg-info";

const deserializeScore = (s: string): number => parseInt(s, 36);
const deserializeTags = (t: string): { [key in Tag]: number } => {
  const [a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p] = t
    .split("-")
    .map((v) => parseInt(v));
  return {
    BOLT: a,
    BRAIN: b,
    CHIMI: c,
    CHOICE: d,
    DNA: e,
    EYE: f,
    FLAG: g,
    GEAR: h,
    HOURGLASS: i,
    KEY: j,
    MAGIC: k,
    MAPLE: l,
    PLANET: m,
    PUZZLE: n,
    STAR: o,
    SPARKLE: p,
  };
};
const deserializeActionTokens = (
  at: string
): { [key in ActionType]: number } => {
  const [a, b, c, d] = at.split("-").map((v) => parseInt(v));
  return {
    MOVE: a,
    FIGHT: b,
    HEROIC: c,
    WILD: d,
  };
};
const deserializeHeroes = (h: string): { [key in HeroKey]?: HeroState } => {
  return h.split("-").reduce((a: { [key in HeroKey]?: HeroState }, v) => {
    const [, hIdx, crossover, dead, cooldown, areaIdx] =
      parseInt(v, 36)
        .toString()
        .match(/1(.+)(.)(.)(.)(.)/) || [];

    return {
      ...a,
      [HERO_LIST[+hIdx]]: {
        crossover: Boolean(Number(crossover)),
        dead: Boolean(Number(dead)),
        cooldown: Number(cooldown),
        area: ["AVX", "MULTIVERSE", "DC"][Number(areaIdx)],
      },
    };
  }, {});
};
const deserializeEquips = (
  equips: Array<string>
): { [key in HeroKey | "GENERIC"]?: Array<EquipKey> } => {
  const res: { [key in HeroKey | "GENERIC"]?: Array<EquipKey> } = {};

  for (const e of equips) {
    const [hIdx, ...eIdxes] = e.split("-");
    if (hIdx === "0") {
      res.GENERIC = eIdxes
        .filter((v) => v !== "")
        .map((eIdx) => EQUIP_LIST[+eIdx]);
    } else {
      res[HERO_LIST[+hIdx - 1]] = eIdxes
        .filter((v) => v !== "")
        .map((eIdx) => EQUIP_LIST[+eIdx]);
    }
  }

  return res;
};
const deserializeTeams = (t: string): Array<TeamKey> => {
  return t
    .split("-")
    .map((v) => parseInt(v, 36))
    .filter((v) => v)
    .map((tIdx) => TEAM_LIST[tIdx]);
};
const deserializePets = (p: string): Array<PetKey> => {
  return p
    .split("-")
    .map((v) => parseInt(v, 36))
    .filter((v) => v)
    .map((pIdx) => PET_LIST[pIdx]);
};
const deserializeMisc = (m: string): Array<MiscKey> => {
  return m
    .split("-")
    .map((v) => parseInt(v, 36))
    .filter((v) => v)
    .map((mIdx) => MISC_LIST[mIdx]);
};
const deserializeSpecialRewards = (
  sr: string
): { [key in SpecialReward]: number } => {
  const [a, b, c, d, e, f, g] = sr.split("-").map((v) => parseInt(v));
  return {
    DANGER_ROOM: a,
    CAMP_HAMMOND: b,
    RECOVER: c,
    RECOVER_F4: d,
    TRADE: e,
    MKRAAN_CRYSTAL: f,
    PORTAL: g,
  };
};
const deserializeInfinityStones = (inf: string): Array<InfinityStone> => {
  return parseInt(inf, 36)
    .toString()
    .slice(1)
    .split("")
    .map((isIdx) => INFINITY_STONES[+isIdx]);
};
const deserializeCompletedBtns = (b: string): Array<string> => {
  return b
    .split("-")
    .filter(v => v)
    .map((bIdx) => Object.keys(combinedButtons)[parseInt(bIdx, 36)]);
};
const deserializeConnectedPaths = (p: string): Array<string> => {
  return p
    .split("-")
    .map((pIdx) => Object.keys(combinedPaths)[parseInt(pIdx, 36)]);
};
const deserializeAchievements = (
  ac: string
): { [key in Achievement]: boolean } => {
  const values = parseInt(ac, 36)
    .toString(2)
    .padStart(40, "0")
    .split("")
    .map((v) => parseInt(v));
  return ACHIEVEMENT_LIST.reduce(
    (a: { [key in Achievement]?: boolean }, b, i) => {
      return {
        ...a,
        [b]: Boolean(values[i]),
      };
    },
    {}
  ) as { [key in Achievement]: boolean };
};
const deserializeCounts = (co: string): Counts => {
  const [a, b, c, d, e] = co.split("-").map((v) => parseInt(v));
  return {
    bolts: a,
    portals: b,
    stars: c,
    collector_items: d,
    maple: e,
  };
};
export const deserializeGameStatus = (serialized: string) => {
  const [s, t, a, h, te, p, m, sr, i, b, pa, ac, c, ...e] =
    serialized.split(",");
  const score = deserializeScore(s);
  const tags = deserializeTags(t);
  const actionTokens = deserializeActionTokens(a);
  const heroes = deserializeHeroes(h);
  const equipment = deserializeEquips(e);
  const teams = deserializeTeams(te);
  const pets = deserializePets(p);
  const misc = deserializeMisc(m);
  const specialRewards = deserializeSpecialRewards(sr);
  const infinityStones = deserializeInfinityStones(i);
  const completedBtns = deserializeCompletedBtns(b);
  const connectedPaths = deserializeConnectedPaths(pa);
  const achievements = deserializeAchievements(ac);
  const counts = deserializeCounts(c);
  return JSON.stringify({
    score,
    tags,
    actionTokens,
    heroes,
    equipment,
    teams,
    pets,
    misc,
    specialRewards,
    infinityStones,
    completedBtns,
    connectedPaths,
    achievements,
    counts,
  });
};
