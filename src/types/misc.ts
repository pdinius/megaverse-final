const MISC_LIST = ["HYBRID_DECK", "PHAGE", "LASHER", "AGONY", "RIOT"] as const;

export type MiscKey = (typeof MISC_LIST)[number];

export type MiscName = "Hybrid Deck" | "Phage" | "Lasher" | "Agony" | "Riot";

export const isMiscKey = (s: string): s is MiscKey =>
  MISC_LIST.includes(s as MiscKey);
