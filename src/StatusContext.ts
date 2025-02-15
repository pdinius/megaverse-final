import { createContext } from "react";
import { IGameStatus } from "./types/game-status";

const generateBlankStatus = (): IGameStatus => {
  const state: IGameStatus = {
    actionTokens: {
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    },
    availableButtons: [],
    btnClickHandler: () => () => {},
    chained: [],
    currentAction: "",
    currentBtnClicked: "",
    debugging: false,
    toggleDebuggingMode: () => {},
    currentState: "",
    isLegalStateData: () => false,
    loadFromDebugOnClick: () => {},
    equipment: {},
    infinityStones: [],
    lost: () => {},
    modalOpen: false,
    resetClickHandler: () => {},
    resolveDeadpool: () => {},
    resolveDeadpoolVictim: () => {},
    getScore: () => 0,
    specialRewards: {
      DANGER_ROOM: 0,
      CAMP_HAMMOND: 0,
      RECOVER: 0,
      RECOVER_F4: 0,
      TRADE: 0,
      MKRAAN_CRYSTAL: 0,
      PORTAL: 2,
    },
    tagClickHandler: () => {},
    tags: {
      BOLT: 0,
      BRAIN: 0,
      CHIMI: 0,
      CHOICE: 0,
      DNA: 0,
      EYE: 0,
      FLAG: 0,
      GEAR: 0,
      HOURGLASS: 0,
      KEY: 0,
      MAGIC: 0,
      MAPLE: 0,
      PLANET: 0,
      PUZZLE: 0,
      STAR: 1,
      SPARKLE: 0,
    },
    toast: {
      message: "",
      open: false,
    },
    toggleCampHammond: () => {},
    toggleDangerRoom: () => {},
    toggleModalOpen: () => {},
    undo: () => {},
    undoDisabled: false,
    won: () => {},
    generateTeamChoiceListProps: () => ({
      title: "",
      data: [],
      srcs: {},
      selection: new Set(),
      itemClickHandler: () => {},
      itemClickable: () => false,
      titleGenerator: () => "",
    }),
    generateEquipChoiceListProps: () => ({
      title: "",
      data: [],
      srcs: {},
      selection: new Set(),
      itemClickHandler: () => {},
      itemClickable: () => false,
      titleGenerator: () => "",
    }),
    generatePetChoiceListProps: () => ({
      title: "",
      data: [],
      srcs: {},
      selection: new Set(),
      itemClickHandler: () => {},
      itemClickable: () => false,
      titleGenerator: () => "",
    }),
    isTagClickable: () => false,
    areGameResolutionButtonsClickable: function (): boolean {
      throw new Error("Function not implemented.");
    },
    areHeroesDead: false,
    avxHeroes: [],
    crossoverHeroes: [],
    deadHeroes: [],
    drawerOpen: false,
    getAchievementSVGPathStrings: () => [],
    getCurrentVillain: () => null,
    getLegalHeroesForFight: () => [],
    getPathSVGPathInfo: () => [],
    getUnearnedRewardOverlaySVGPathStrings: () => [],
    getVillainOverlaySVGPathStrings: () => [],
    heroClickHandler: () => {},
    heroes: {},
    heroRoster: new Set(),
    isHeroClickable: () => false,
    isPortalButtonClickable: () => false,
    isRecoverButtonClickable: () => false,
    modifySpendingActionTokens: () => {},
    multiverseHeroes: [],
    portalButtonClickHandler: () => {},
    recoverButtonClickHandler: () => {},
    showActionTokensAccordion: () => false,
    spendingActionTokens: {
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    },
    toggleDrawerOpen: () => {},
    usingCampHammond: false,
    usingDangerRoom: false,
    getCode: () => null,
    testing: false,
    previousActions: [],
    getRewardSVGPathString: () => "",
    overlays: null,
    setOverlays: () => {},
    skip: () => {},
  };
  return state;
};

export const statusContext = createContext(generateBlankStatus());
