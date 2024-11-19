import { createContext } from "react";
import { IGameStatus } from "./types/game-status";

const generateBlankStatus = (): IGameStatus => {
  return {
    achievements: {
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
      thanos_defeated: false,
      war_machine_removed: false,
      vision_removed: false,
      unlock_rogue_and_gambit: false,
      unlock_colossus_and_kitty: false,
      unlock_jessica_and_luke: false,
      unlock_chod_corsair_hepzibah_raza: false,
      total_bolts: 0,
      total_portals: 0,
      total_stars: 0,
    },
    actionTokens: {
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    },
    availableButtons: [],
    blocked: false,
    btnClickHandler: () => () => {},
    canRecover: () => false,
    chained: [],
    clearCurrentAction: () => {},
    completed: [],
    connected: [],
    cooldown: [[], []],
    currentAction: "",
    currentBtnClicked: "",
    endFight: () => {},
    equipment: {},
    getArea: () => "AVX",
    getHeroesAvX: () => [],
    getHeroesMultiverse: () => [],
    getHeroesCrossover: () => [],
    heroesDead: [],
    heroChoices: [],
    infinityStones: [],
    isRosterHeroClickable: () => true,
    lost: () => {},
    modalOpen: false,
    resetClickHandler: () => {},
    recruitedHeroes: [],
    resolveDeadpool: () => {},
    resolveDeadpoolVictim: () => {},
    roster: new Set(),
    score: 0,
    specialRewards: {
      DANGER_ROOM: 0,
      CAMP_HAMMOND: 0,
      RECOVER: 0,
      RECOVER_F4: 0,
      TRADE: 0,
      MKRAAN_CRYSTAL: 0,
      PORTAL: 2,
    },
    spendButtonClickHandler: () => {},
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
    toast: "",
    toggleCampHammond: () => {},
    toggleDangerRoom: () => {},
    toggleModalOpen: () => {},
    toggleRosterHero: () => () => {},
    undo: () => {},
    undoDisabled: false,
    unearnedPaths: () => [],
    unlockedHeroesClickHandler: () => {},
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
    isTooManyPets: () => false,
    recoverHero: () => {},
    useCampHammond: false,
    useDangerRoom: false,
    equipRoster: new Set(),
    teamRoster: new Set(),
    petRoster: new Set(),
    spentActionTokens: {
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    },
    modifyActionTokens: () => {},
    isTagClickable: () => false,
    isDrawerHeroClickable: () => false,
  };
};

export const statusContext = createContext(generateBlankStatus());
