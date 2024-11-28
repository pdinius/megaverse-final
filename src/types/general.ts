export type Area = "AVX" | "DC" | "MULTIVERSE";

export const isArea = (s: string): s is Area => {
  return s === "AVX" || s === "MULTIVERSE" || s === "DC";
}

export type Section =
  | "AVX"
  | "CHARIOT"
  | "FINALITY"
  | "EXILE"
  | "STARS"
  | "FLAME"
  | "CASTLE"
  | "DARKNESS"
  | "SHIELD"
  | "WAR"
  | "JOURNEY"
  | "MIDNIGHT"
  | "FOOL"
  | "ABYSS"
  | "FEAR"
  | "GALAXY"
  | "MIST";

export const TAGS = [
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
] as const;
export type Tag = (typeof TAGS)[number];
export const isTag = (s: string): s is Tag => TAGS.includes(s as Tag);

export const ACTION_TYPES = ["MOVE", "FIGHT", "HEROIC", "WILD"] as const;
export type ActionType = (typeof ACTION_TYPES)[number];
export const isActionType = (s: string): s is ActionType =>
  ACTION_TYPES.includes(s as ActionType);

const SPECIAL_REWARD = [
  "CAMP_HAMMOND",
  "DANGER_ROOM",
  "RECOVER",
  "RECOVER_F4",
  "TRADE",
  "MKRAAN_CRYSTAL",
  "PORTAL",
] as const;
export type SpecialReward = (typeof SPECIAL_REWARD)[number];
export const isSpecialReward = (s: string): s is SpecialReward =>
  SPECIAL_REWARD.includes(s as SpecialReward);

const INFINITY_STONES = [
  "INFINITY_RED",
  "INFINITY_ORANGE",
  "INFINITY_YELLOW",
  "INFINITY_GREEN",
  "INFINITY_BLUE",
  "INFINITY_PURPLE",
] as const;
export type InfinityStone = (typeof INFINITY_STONES)[number];
export const isInfinityKey = (s: string): s is InfinityStone =>
  INFINITY_STONES.includes(s as InfinityStone);
