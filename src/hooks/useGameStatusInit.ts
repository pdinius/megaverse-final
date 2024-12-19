import { EquipKey } from "../types/equipment";
import { Achievements, Counts, HeroState } from "../types/game-status";
import { ActionType, Area, SpecialReward, Tag } from "../types/general";
import { HeroKey } from "../types/heroes";

export const getNewHeroProps = (isChained: boolean, area: Area): HeroState => ({
  dead: false,
  crossover: false,
  cooldown: isChained ? 2 : 0,
  area
});

export const getStartingHeroes = () => ({
  BLACK_PANTHER_SHURI: getNewHeroProps(false, "MULTIVERSE"),
  CAPTAIN_CARTER: getNewHeroProps(false, "MULTIVERSE"),
  IRONHEART: getNewHeroProps(false, "MULTIVERSE"),
  MIGHTY_THOR: getNewHeroProps(false, "MULTIVERSE"),
});

export const getStartingTags = (testing: boolean): { [key in Tag]: number } => ({
  BOLT: testing ? Infinity : 0,
  BRAIN: testing ? Infinity : 0,
  CHIMI: testing ? Infinity : 0,
  CHOICE: testing ? Infinity : 0,
  DNA: testing ? Infinity : 0,
  EYE: testing ? Infinity : 0,
  FLAG: testing ? Infinity : 0,
  GEAR: testing ? Infinity : 0,
  HOURGLASS: testing ? Infinity : 0,
  KEY: testing ? Infinity : 0,
  MAGIC: testing ? Infinity : 0,
  MAPLE: testing ? Infinity : 0,
  PLANET: testing ? Infinity : 0,
  PUZZLE: testing ? Infinity : 0,
  STAR: testing ? Infinity : 0,
  SPARKLE: testing ? Infinity : 0,
});

export const getStartingActionTokens = (): { [key in ActionType]: number } => ({
  MOVE: 0,
  FIGHT: 0,
  HEROIC: 0,
  WILD: 0,
});

export const getStartingEquipment = (): {
  [key in HeroKey | "GENERIC"]?: Array<EquipKey>;
} => ({
  GENERIC: [],
});

export const getStartingSpecialRewards = (): {
  [key in SpecialReward]: number;
} => ({
  DANGER_ROOM: 0,
  CAMP_HAMMOND: 0,
  RECOVER: 0,
  RECOVER_F4: 0,
  TRADE: 0,
  MKRAAN_CRYSTAL: 0,
  PORTAL: 2,
});

export const getStartingConnectedPaths = () => new Set(["JOURNEY_GROUP_1"]);

export const getStartingAchievements = (): Achievements => ({
  win_with_beast: false,
  win_with_iceman: false,
  win_with_jean: false,
  win_with_cyclops: false,
  win_with_forge: false,
  win_with_storm: false,
  win_with_miles: false,
  win_with_iron_man: false,
  win_with_hulk: false,
  win_with_cap: false,
  win_with_widow: false,
  win_with_wanda: false,
  win_with_black_panther: false,
  win_with_starlord: false,
  win_with_antman: false,
  win_with_wasp: false,
  win_with_moon_knight: false,
  win_with_inhumans: false,
  win_with_new_avengers: false,
  win_with_midnight_sons: false,
  win_with_dark_avengers: false,
  win_with_asgardians: false,
  win_with_starjammers: false,
  win_with_guardians_galaxy: false,
  win_with_illuminati: false,
  win_with_thunderbolts: false,
  win_with_ebony_blade: false,
  win_with_mjolnir: false,
  win_with_guardian: false,
  win_with_puck: false,
  win_with_sasquatch: false,
  win_with_snowbird: false,
  win_with_northstar: false,
  win_with_pet: false,
  war_machine_removed: false,
  vision_removed: false,
  unlock_rogue_and_gambit: false,
  unlock_colossus_and_kitty: false,
  unlock_jessica_and_luke: false,
  unlock_chod_corsair_hepzibah_raza: false,
});

export const getStartingCounts = (): Counts => ({
  bolts: 0,
  portals: 0,
  stars: 0,
  collector_items: 0,
  maple: 0,
});

export const getStartingAvailableButtons = () => [
  "XMEN_START",
  "AVENGERS_START",
];
