import {
  ActionType,
  Area,
  InfinityStone,
  isArea,
  SpecialReward,
  Tag,
} from "./general";
import { TeamKey } from "./teams";
import { PetKey } from "./pets";
import { HeroKey } from "./heroes";
import { EquipKey } from "./equipment";
import { ChoiceSelectorProps } from "../components/GameSetup/ChoiceSelector/ChoiceSelector";
import { VillainKey } from "./villain";
import { Path } from "./svg";
import { VillainInfo } from "../lib/villain-info";

export const ACHIEVEMENT_LIST = [
  "win_with_beast",
  "win_with_iceman",
  "win_with_jean",
  "win_with_cyclops",
  "win_with_forge",
  "win_with_storm",
  "win_with_miles",
  "win_with_iron_man",
  "win_with_hulk",
  "win_with_cap",
  "win_with_widow",
  "win_with_wanda",
  "win_with_black_panther",
  "win_with_starlord",
  "win_with_antman",
  "win_with_wasp",
  "win_with_moon_knight",
  "win_with_guardian",
  "win_with_puck",
  "win_with_sasquatch",
  "win_with_snowbird",
  "win_with_northstar",
  "win_with_inhumans",
  "win_with_new_avengers",
  "win_with_midnight_sons",
  "win_with_dark_avengers",
  "win_with_asgardians",
  "win_with_starjammers",
  "win_with_guardians_galaxy",
  "win_with_illuminati",
  "win_with_thunderbolts",
  "win_with_ebony_blade",
  "win_with_mjolnir",
  "win_with_pet",
  "unlock_rogue_and_gambit",
  "unlock_colossus_and_kitty",
  "unlock_jessica_and_luke",
  "unlock_chod_corsair_hepzibah_raza",
  "war_machine_removed",
  "vision_removed",
] as const;

export type Achievement = (typeof ACHIEVEMENT_LIST)[number];

export const isAchievement = (s: string): s is Achievement => {
  return ACHIEVEMENT_LIST.includes(s as Achievement);
};

export type Achievements = { [key in Achievement]: boolean };

export interface Counts {
  bolts: number;
  portals: number;
  stars: number;
  collector_items: number;
  maple: number;
}

export const isCounts = (o: unknown): o is Counts => {
  return (
    typeof o === "object" &&
    o !== null &&
    "bolts" in o &&
    "portals" in o &&
    "stars" in o &&
    "collector_items" in o &&
    "maple" in o &&
    Object.keys(o).length === 5 &&
    Object.values(o).every((v) => typeof v === "number")
  );
};

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
  area: Area;
}

export const isHeroState = (o: unknown): o is HeroState => {
  return (
    typeof o === "object" &&
    o !== null &&
    "crossover" in o &&
    typeof o.crossover === "boolean" &&
    "dead" in o &&
    typeof o.dead === "boolean" &&
    "cooldown" in o &&
    typeof o.cooldown === "number" &&
    "area" in o &&
    typeof o.area === "string" &&
    isArea(o.area) &&
    Object.keys(o).length === 4
  );
};

export interface IGameStatus {
  actionTokens: { [key in ActionType]: number };
  areGameResolutionButtonsClickable: () => boolean;
  areHeroesDead: boolean;
  availableButtons: Array<string>;
  avxHeroes: Array<HeroKey>;
  btnClickHandler: (key: string) => void;
  chained: Array<HeroKey>;
  crossoverHeroes: Array<HeroKey>;
  currentAction: CurrentAction;
  currentBtnClicked: string;
  deadHeroes: Array<HeroKey>;
  debugging: boolean;
  toggleDebuggingMode: () => void;
  currentState: string;
  isLegalStateData: (s: string) => boolean;
  loadFromDebugOnClick: (s: string) => void;
  drawerOpen: boolean;
  equipment: { [key in HeroKey | "GENERIC"]?: Array<EquipKey> };
  generateEquipChoiceListProps: () => ChoiceSelectorProps<EquipKey>;
  generatePetChoiceListProps: () => ChoiceSelectorProps<PetKey>;
  generateTeamChoiceListProps: () => ChoiceSelectorProps<TeamKey>;
  getAchievementSVGPathStrings: () => Array<string>;
  getCode: () => string | null;
  getCurrentVillain: () => VillainKey | null;
  getLegalHeroesForFight: () => Array<HeroKey>;
  getPathSVGPathInfo: () => Array<{ key: string, props: Path | Array<Path> }>;
  getScore: () => number;
  getUnearnedRewardOverlaySVGPathStrings: () => Array<string>;
  getVillainOverlaySVGPathStrings: () => Array<VillainInfo>;
  heroClickHandler: (h: HeroKey) => void;
  heroes: { [key in HeroKey]?: HeroState };
  heroRoster: Set<HeroKey>;
  infinityStones: Array<InfinityStone>;
  isHeroClickable: (h: HeroKey) => boolean;
  isPortalButtonClickable: () => boolean;
  isRecoverButtonClickable: (r: "RECOVER" | "RECOVER_F4") => boolean;
  isTagClickable: (t: Tag) => boolean;
  lost: () => void;
  modalOpen: boolean;
  modifySpendingActionTokens: (a: ActionType, q: number) => void;
  multiverseHeroes: Array<HeroKey>;
  portalButtonClickHandler: () => void;
  recoverButtonClickHandler: (r: "RECOVER" | "RECOVER_F4") => void;
  resetClickHandler: (cancel?: boolean) => void;
  resolveDeadpool: (score: number) => void;
  resolveDeadpoolVictim: () => void;
  showActionTokensAccordion: () => boolean;
  skip: () => void;
  specialRewards: { [key in SpecialReward]: number };
  spendingActionTokens: { [key in ActionType]: number };
  tagClickHandler: (t: Tag) => void;
  tags: { [key in Tag]: number };
  team?: TeamKey;
  testing: boolean;
  toast: { open: boolean; message: string };
  toggleCampHammond: () => void;
  toggleDangerRoom: () => void;
  toggleDrawerOpen: (b?: boolean) => void;
  toggleModalOpen: (b?: boolean) => void;
  undo: () => void;
  undoDisabled: boolean;
  usingCampHammond: boolean;
  usingDangerRoom: boolean;
  won: () => void;
  previousActions: Array<string>;
}
