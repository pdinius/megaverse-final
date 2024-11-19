const PET_LIST = [
  "PET_JEFF",
  "PET_LOCKHEED",
  "PET_ACE_THE_BAT_HOUND",
  "PET_ALLIGATOR_LOKI",
  "PET_DETECTIVE_CHIMP",
  "PET_DEX_STARR",
  "PET_REDWING",
  "PET_THROG",
  "PET_COSMO",
  "PET_GOOSE",
] as const;

export type PetKey = (typeof PET_LIST)[number];

export type PetName =
  | "Jeff"
  | "Lockheed"
  | "Ace the Bat-Hound"
  | "Alligator Loki"
  | "Detective Chimp"
  | "Dex-Starr"
  | "Redwing"
  | "Throg"
  | "Cosmo"
  | "Goose";

export const isPetKey = (s: string): s is PetKey =>
  PET_LIST.includes(s as PetKey);
