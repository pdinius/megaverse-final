/* eslint-disable @typescript-eslint/no-explicit-any */
import { EQUIP_LIST } from "../types/equipment";
import { Achievement, isHeroState } from "../types/game-status";
import { INFINITY_STONES, InfinityStone } from "../types/general";
import { HERO_LIST, HeroKey } from "../types/heroes";
import { MISC_LIST, MiscKey } from "../types/misc";
import { PET_LIST, PetKey } from "../types/pets";
import { TEAM_LIST, TeamKey } from "../types/teams";
import { combinedButtons, combinedPaths } from "./svg-info";

const serializeScore = (s: any) => s.toString(36);
const serializeTags = (t: any) => Object.values(t).join("-");
const serializeActionTokens = (a: any) => Object.values(a).join("-");
const serializeHeroes = (h: any) =>
  Object.entries(h)
    .map(([k, v]) => {
      const idx = HERO_LIST.indexOf(k as HeroKey);
      if (!isHeroState(v))
        throw Error("Not a hero state while serializing state.");
      const c = +v.crossover; // 1 digit
      const d = +v.dead; // 1 digit
      const cd = v.cooldown; // 1 digit
      const a = v.area === "AVX" ? 0 : v.area === "MULTIVERSE" ? 1 : 2; // 1 digit
      return Number(`1${idx}${c}${d}${cd}${a}`).toString(36);
    })
    .join("-");
const serializeEquips = (e: any) =>
  Object.entries(e)
    .map(([k, v]) => {
      const heroI = k === "GENERIC" ? 0 : HERO_LIST.indexOf(k as HeroKey) + 1;
      if (!Array.isArray(v))
        throw Error(
          `Equip array wasn't instance of array while serializing state.`
        );
      const eq = v.map((e) => EQUIP_LIST.indexOf(e)).join("-");
      return `${heroI}-${eq}`;
    })
    .join(",");
const serializeTeams = (t: any) =>
  (t as Array<TeamKey>).map((t) => TEAM_LIST.indexOf(t).toString(36)).join("-");
const serializePets = (p: any) =>
  (p as Array<PetKey>).map((p) => PET_LIST.indexOf(p).toString(36)).join("-");
const serializeMisc = (m: any) =>
  (m as Array<MiscKey>).map((m) => MISC_LIST.indexOf(m).toString(36)).join("-");
const serializeSpecialRewards = (sr: any) => Object.values(sr).join("-");
const serializeInfinityStones = (inf: any) =>
  Number(
    "1" +
      (inf as Array<InfinityStone>)
        .map((inf) => INFINITY_STONES.indexOf(inf))
        .join("")
  ).toString(36);
const serializeCompletedBtns = (b: any) =>
  (b as Array<string>)
    .map((btn) => Object.keys(combinedButtons).indexOf(btn).toString(36))
    .join("-");
const serializeConnectedPaths = (p: any) =>
  (p as Array<string>)
    .map((path) => Object.keys(combinedPaths).indexOf(path).toString(36))
    .join("-");
const serializeAchievements = (a: any) =>
  parseInt(
    Object.values(a as { [key in Achievement]: boolean })
      .map((v) => +v)
      .join(""),
    2
  ).toString(36);
const serializeCounts = (c: any) => Object.values(c).join("-");
export const serializeGameStatus = (parsed: any) => {
  const s = serializeScore(parsed.score);
  const tagStr = serializeTags(parsed.tags);
  const actStr = serializeActionTokens(parsed.actionTokens);
  const heroes = serializeHeroes(parsed.heroes);
  const equips = serializeEquips(parsed.equipment);
  const teams = serializeTeams(parsed.teams);
  const pets = serializePets(parsed.pets);
  const misc = serializeMisc(parsed.misc);
  const sr = serializeSpecialRewards(parsed.specialRewards);
  const iStones = serializeInfinityStones(parsed.infinityStones);
  const btns = serializeCompletedBtns(parsed.completedBtns);
  const paths = serializeConnectedPaths(parsed.connectedPaths);
  const ach = serializeAchievements(parsed.achievements);
  const cnts = serializeCounts(parsed.counts);
  return [
    s,
    tagStr,
    actStr,
    heroes,
    teams,
    pets,
    misc,
    sr,
    iStones,
    btns,
    paths,
    ach,
    cnts,
    equips,
  ].join(",");
};
