import { MouseEventHandler } from "react";
import { ActionType, Area, InfinityStone, SpecialReward, Tag } from "./general";
import { TeamKey } from "./teams";
import { PetKey } from "./pets";
import { HeroKey } from "./heroes";
import { EquipKey } from "./equipment";

interface ChoiceListProps<T extends string> {
  title: string;
  subtitle?: string;
  data: Array<T>;
  srcs: { [key in T]?: string };
  selection: Set<T>;
  itemClickHandler: (v: T) => void;
  itemClickable: (v: T) => boolean;
  titleGenerator: (v: T) => string;
}

export type Achievement =
  | "win_with_beast"
  | "win_with_iceman"
  | "win_with_jean"
  | "win_with_cyclops"
  | "win_with_forge"
  | "win_with_storm"
  | "win_with_miles"
  | "win_with_iron_man"
  | "win_with_hulk"
  | "win_with_cap"
  | "win_with_widow"
  | "win_with_wanda"
  | "win_with_black_panther"
  | "win_with_starlord"
  | "win_with_antman"
  | "win_with_wasp"
  | "win_with_moon_knight"
  | "win_with_guardian"
  | "win_with_puck"
  | "win_with_sasquatch"
  | "win_with_snowbird"
  | "win_with_northstar"
  | "win_with_inhumans"
  | "win_with_new_avengers"
  | "win_with_midnight_sons"
  | "win_with_dark_avengers"
  | "win_with_asgardians"
  | "win_with_starjammers"
  | "win_with_guardians_galaxy"
  | "win_with_illuminati"
  | "win_with_thunderbolts"
  | "win_with_ebony_blade"
  | "win_with_mjolnir"
  | "win_with_pet"
  | "unlock_rogue_and_gambit"
  | "unlock_colossus_and_kitty"
  | "unlock_jessica_and_luke"
  | "unlock_chod_corsair_hepzibah_raza"
  | "war_machine_removed"
  | "vision_removed";

export type Achievements = { [key in Achievement]: boolean };

export interface Counts {
  bolts: number;
  portals: number;
  stars: number;
  collector_items: number;
  maple: number;
}

export type CurrentAction =
  | ""
  | "resolvingFight"
  | "spendingPortal"
  | "resolvingRecover"
  | "resolvingRecoverF4"
  | "removingHero"
  | "tradingHero"
  | "choosingDeadpoolVictim"
  | "reset1"
  | "reset2"
  | "pushToStack";

export const DRAWER_ACTIONS: Array<CurrentAction> = [
  "removingHero",
  "resolvingRecover",
  "resolvingRecoverF4",
  "tradingHero",
];

export interface HeroState {
  crossover: boolean;
  dead: boolean;
  cooldown: number;
}

export interface IGameStatus {
  achievements: Achievements;
  actionTokens: { [key in ActionType]: number };
  availableButtons: Array<string>;
  blocked: boolean;
  btnClickHandler: (key: string, moved: boolean) => MouseEventHandler;
  canRecover: (h: HeroKey) => boolean;
  chained: Array<HeroKey>;
  clearCurrentAction: () => void;
  completed: Array<string>;
  connected: Array<string>;
  cooldown: [Array<HeroKey>, Array<HeroKey>];
  currentAction: CurrentAction;
  currentBtnClicked: string;
  endFight: () => void;
  equipment: { [key in HeroKey]?: Array<EquipKey> };
  equipRoster: Set<EquipKey>;
  generateEquipChoiceListProps: () => ChoiceListProps<EquipKey>;
  generatePetChoiceListProps: () => ChoiceListProps<PetKey>;
  generateTeamChoiceListProps: () => ChoiceListProps<TeamKey>;
  getArea: (btnKey: string) => Area;
  getHeroesAvX: () => HeroKey[];
  getHeroesCrossover: () => HeroKey[];
  getHeroesMultiverse: () => HeroKey[];
  heroChoices: Array<HeroKey>;
  heroesDead: Array<HeroKey>;
  infinityStones: Array<InfinityStone>;
  isDrawerHeroClickable: (h: HeroKey) => boolean;
  isRosterHeroClickable: (h: HeroKey) => boolean;
  isTagClickable: (t: Tag | SpecialReward) => boolean;
  isTooManyPets: () => boolean;
  lost: () => void;
  modalOpen: boolean;
  modifyActionTokens: (a: ActionType, qtx: number) => void;
  petRoster: Set<PetKey>;
  recoverHero: (h: HeroKey) => void;
  recruitedHeroes: Array<HeroKey>;
  resetClickHandler: () => void;
  resolveDeadpool: (score: number) => void;
  resolveDeadpoolVictim: () => void;
  roster: Set<HeroKey>;
  score: number;
  specialRewards: { [key in SpecialReward]: number };
  spendButtonClickHandler: (action: CurrentAction) => void;
  spentActionTokens: { [key in ActionType]: number };
  tagClickHandler: (t: Tag | SpecialReward) => void;
  tags: { [key in Tag]: number };
  teamRoster: Set<TeamKey>;
  toast: string;
  toggleCampHammond: () => void;
  toggleDangerRoom: () => void;
  toggleModalOpen: (b?: boolean) => void;
  toggleRosterHero: (h: HeroKey) => void;
  undo: (prev?: string) => void;
  undoDisabled: boolean;
  unearnedPaths: () => Array<string>;
  unlockedHeroesClickHandler: (h: HeroKey) => void;
  useCampHammond: boolean;
  useDangerRoom: boolean;
  won: () => void;
}
