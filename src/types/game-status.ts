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

export interface Achievements {
  win_with_beast: boolean;
  win_with_iceman: boolean;
  win_with_jean: boolean;
  win_with_cyclops: boolean;
  win_with_forge: boolean;
  win_with_storm: boolean;
  win_with_miles: boolean;
  win_with_iron_man: boolean;
  win_with_hulk: boolean;
  win_with_cap: boolean;
  win_with_widow: boolean;
  win_with_wanda: boolean;
  win_with_black_panther: boolean;
  win_with_starlord: boolean;
  win_with_antman: boolean;
  win_with_wasp: boolean;
  win_with_moon_knight: boolean;
  win_with_inhumans: boolean;
  win_with_new_avengers: boolean;
  win_with_midnight_sons: boolean;
  win_with_dark_avengers: boolean;
  win_with_asgardians: boolean;
  win_with_starjammers: boolean;
  win_with_guardians_galaxy: boolean;
  win_with_illuminati: boolean;
  win_with_thunderbolts: boolean;
  win_with_ebony_blade: boolean;
  win_with_mjolnir: boolean;
  win_with_pet: boolean;
  unlock_rogue_and_gambit: boolean;
  unlock_colossus_and_kitty: boolean;
  unlock_jessica_and_luke: boolean;
  unlock_chod_corsair_hepzibah_raza: boolean;
  war_machine_removed: boolean;
  vision_removed: boolean;
  win_with_guardian: boolean;
  win_with_puck: boolean;
  win_with_sasquatch: boolean;
  win_with_snowbird: boolean;
  win_with_northstar: boolean;
  thanos_defeated: boolean;
  total_bolts: number;
  total_portals: number;
  total_stars: number;
}

export type CurrentAction =
  | ""
  | "resolvingFight"
  | "spendingPortal"
  | "resolvingRecover"
  | "resolvingRecoverF4"
  | "choosingOrTag"
  | "removingHero"
  | "tradingHero"
  | "fightingDeadpool"
  | "choosingDeadpoolVictim"
  | "reset1"
  | "reset2";

export const DRAWER_ACTIONS: Array<CurrentAction> = [
  "choosingOrTag",
  "removingHero",
  "resolvingRecover",
  "resolvingRecoverF4",
  "tradingHero",
];

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
