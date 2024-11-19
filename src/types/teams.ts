const TEAM_LIST = [
  "TEAM_A_FORCE",
  "TEAM_ALPHA_FLIGHT",
  "TEAM_ASGARDIANS_ALLIES",
  "TEAM_AVENGERS",
  "TEAM_CAPTAIN_AMERICA_SECRET_AVENGERS",
  "TEAM_CHAMPIONS",
  "TEAM_DARK_AVENGERS",
  "TEAM_DEADPOOL_TEAMUP",
  "TEAM_DEFENDERS_MANHATTAN",
  "TEAM_DEFENDERS",
  "TEAM_EXCALIBUR",
  "TEAM_FANTASTIC_FOUR",
  "TEAM_FORCE_WORKS",
  "TEAM_GENX",
  "TEAM_GUARDIANS_OF_THE_GALAXY",
  "TEAM_ILLUMINATI",
  "TEAM_INFINITY_WATCH",
  "TEAM_INHUMANS",
  "TEAM_IRON_MAN_PROREGISTRATION",
  "TEAM_MARVEL_KNIGHTS",
  "TEAM_MIDNIGHT_SONS",
  "TEAM_NEW_AVENGERS",
  "TEAM_NEW_MUTANTS",
  "TEAM_RED_HULKS_THUNDERBOLTS",
  "TEAM_RESISTANCE_AGAINST_APOCALYPSE",
  "TEAM_SAVAGE_AVENGERS",
  "TEAM_SHIELD",
  "TEAM_SPIDER_ARMY",
  "TEAM_STARJAMMERS",
  "TEAM_SWORDBEARERS_OF_KRAKOA",
  "TEAM_UNCANNY_XFORCE",
  "TEAM_UNITED_HEROES",
  "TEAM_WAKANDANS",
  "TEAM_WEST_COAST_AVENGERS",
  "TEAM_XFACTOR",
  "TEAM_XFORCE",
  "TEAM_XMEN",
  "TEAM_YOUNG_AVENGERS",
] as const;

export type TeamKey = (typeof TEAM_LIST)[number];

export type TeamName =
  | "A-Force"
  | "Alpha Flight"
  | "Asgardians & Allies"
  | "Avengers"
  | "Champions"
  | "Dark Avengers"
  | "Deadpool Team-Up"
  | "Defenders (Manhattan)"
  | "Defenders"
  | "Excalibur"
  | "Fantastic Four"
  | "Force Works"
  | "Gen-X"
  | "Guardians of the Galaxy"
  | "Illuminati"
  | "Infinity Watch"
  | "Inhumans"
  | "Marvel Knights"
  | "Midnight Sons"
  | "New Avengers"
  | "New Mutants"
  | "Red Hulk's Thunderbolts"
  | "Resistance Against Apocalypse"
  | "S.H.I.E.L.D."
  | "Savage Avengers"
  | "Spider-Army"
  | "Starjammers"
  | "Swordbearers of Krakoa"
  | "Team Captain America - Secret Avengers"
  | "Team Iron Man - Pro-Registration"
  | "Uncanny X-Force"
  | "United Heroes"
  | "Wakandans"
  | "West Coast Avengers"
  | "X-Factor"
  | "X-Force"
  | "X-Men"
  | "Young Avengers";

export const isTeamKey = (s: string): s is TeamKey =>
  TEAM_LIST.includes(s as TeamKey);
