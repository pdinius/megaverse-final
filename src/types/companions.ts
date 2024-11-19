const COMPANION_LIST = [
  "COMPANION_ALFRED",
  "COMPANION_BATMOBILE",
  "COMPANION_COMMISSIONER_GORDON",
  "COMPANION_LOIS_LANE",
] as const;

export type CompanionKey = (typeof COMPANION_LIST)[number];

export type CompanionName =
  | "Alfred"
  | "Batmobile"
  | "Commissioner Gordon"
  | "Lois Lane";

export const isPetKey = (s: string): s is CompanionKey =>
  COMPANION_LIST.includes(s as CompanionKey);
