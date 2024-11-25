import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { avxSvgs } from "../assets/svg/avx";
import {
  Achievement,
  Counts,
  CurrentAction,
  HeroState,
} from "../types/game-status";
import {
  ActionType,
  Area,
  InfinityStone,
  isActionType,
  isSpecialReward,
  isTag,
  SpecialReward,
  Tag,
} from "../types/general";
import { HeroKey, isFantasticHero, isHeroKey } from "../types/heroes";
import { isTeamKey, TeamKey } from "../types/teams";
import { EquipKey, isEquipKey } from "../types/equipment";
import { isPetKey, PetKey } from "../types/pets";
import { isMiscKey, MiscKey } from "../types/misc";
import { VillainInfo, villainInfo } from "../lib/villain-info";
import { chainedHeroes, OR_PATHS, pathRewards } from "../lib/rewards";
import { equipmentLookup, heroEquipmentLookup } from "../lib/equipment-lookup";
import {
  combinedButtons,
  combinedOverlays,
  combinedPaths,
} from "../lib/svg-info";
import { heroAreaLookup } from "../lib/hero-area-lookup";
import { teamToHeroLookup } from "../lib/team-lookup";
import {
  ANIM_TIME,
  AVX_TRADE_BTN,
  BOLT_GATES,
  COLLECTOR_BTNS,
  COLLECTOR_COSTS,
  DARK_PHOENIX_BTN,
  DEADPOOL_FIGHT_BTN,
  DEADPOOL_PATH_10_POINTS,
  DEADPOOL_PATH_20_POINTS,
  DEADPOOL_PATH_5_POINTS,
  FIRST_BROOD_QUEEN,
  INFINITY_GAUNTLET_ROAD_PATH,
  INFINITY_PATHS,
  MAX_ROSTER,
  MKRAAN_GATE_PATH,
  PHOENIX_FIVE_BTNS,
  PHOENIX_FIVE_PATH,
  REMOVE_BTNS,
  STAR_BTNS,
} from "../lib/constants";
import {
  buttonToConnectedPaths,
  pathToConnectedButtons,
} from "../lib/connections";
import {
  getNewHeroProps,
  getStartingAchievements,
  getStartingActionTokens,
  getStartingAvailableButtons,
  getStartingConnectedPaths,
  getStartingCounts,
  getStartingEquipment,
  getStartingHeroes,
  getStartingSpecialRewards,
  getStartingTags,
} from "./useGameStatusInit";
import { setAdder, setToggler, TypedEntries, TypedKeys } from "../lib/utils";
import { achievementPaths, achievementToKeyLookup } from "../lib/achievements";
import { Path } from "../types/svg";
import { ChoiceSelectorProps } from "../components/GameSetup/ChoiceSelector/ChoiceSelector";
import { petIconSrcs } from "../lib/pet-icons";
import { translations } from "../lib/translations";
import { equipmentIconSrcs } from "../lib/equip-icons";
import { teamIconSrcs } from "../lib/team-icons";
import { VillainKey } from "../types/villain";

const getBtnArea = (btnKey: string): Area => {
  return Object.keys(avxSvgs.buttons).includes(btnKey) ? "AVX" : "MULTIVERSE";
};

export const useGameStatus = (): IGameStatus => {
  const [score, setScore] = useState(0);
  const [currentAction, setCurrentAction] = useState<CurrentAction>("");
  const [currentBtnClicked, setCurrentBtnClicked] = useState("");
  const [orTagChoosingQueue, setOrTagChoosingQueue] = useState<
    Array<Array<Tag>>
  >([]);
  const [tags, setTags] = useState(getStartingTags());
  const [actionTokens, setActionTokens] = useState(getStartingActionTokens());
  const [heroes, setHeroes] = useState<{ [key in HeroKey]?: HeroState }>(
    getStartingHeroes()
  );
  const [equipment, setEquipment] = useState(getStartingEquipment());
  const [teams, setTeams] = useState<Set<TeamKey>>(new Set());
  const [pets, setPets] = useState<Set<PetKey>>(new Set());
  const [misc, setMisc] = useState<Set<MiscKey>>(new Set());
  const [specialRewards, setSpecialRewards] = useState(
    getStartingSpecialRewards()
  );
  const [infinityStones, setInfinityStones] = useState<Array<InfinityStone>>(
    []
  );
  const [completedBtns, setCompletedBtns] = useState<Set<string>>(new Set());
  const [connectedPaths, setConnectedPaths] = useState(
    getStartingConnectedPaths()
  );
  const [achievements, setAchievements] = useState(getStartingAchievements());
  const [counts, setCounts] = useState(getStartingCounts());
  const [availableButtons, setAvailableButtons] = useState(
    getStartingAvailableButtons()
  );
  const [heroRoster, setHeroRoster] = useState<Set<HeroKey>>(new Set());
  const [deadpoolVictims, setDeadpoolVictims] = useState<Array<HeroKey>>([]);
  const [stack, setStack] = useState<Array<string>>([]);
  const [chained, setChained] = useState<Array<HeroKey>>([]);
  const [teamRoster, setTeamRoster] = useState<Set<TeamKey>>(new Set());
  const [equipRoster, setEquipRoster] = useState<Set<EquipKey>>(new Set());
  const [petRoster, setPetRoster] = useState<Set<PetKey>>(new Set());
  const [usingDangerRoom, setUsingDangerRoom] = useState(false);
  const [usingCampHammond, setUsingCampHammond] = useState(false);
  const [spendingActionTokens, setSpendingActionTokens] = useState(
    getStartingActionTokens()
  );
  const [toast, setToast] = useState({
    open: false,
    message: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const blocked = currentAction !== "";

  //#region toast
  const closeToast = () => {
    setToast({
      open: false,
      message: toast.message,
    });
    setTimeout(() => {
      setToast({ open: false, message: "" });
    }, ANIM_TIME);
  };

  const openToast = (message: string) => {
    setToast({ open: true, message });
  };

  useEffect(() => {
    switch (currentAction) {
      case "removingHero":
        openToast("Choose a hero to remove.");
        break;
      case "tradingHero":
        openToast("Choose a hero to remove.");
        break;
      case "choosingDeadpoolVictim":
        openToast("Choose a hero to lose from the Deadpool fight.");
        break;
    }
  }, [currentAction]);
  //#endregion

  //#region drawer
  const toggleDrawerOpen = (b?: boolean) => {
    setDrawerOpen(b === undefined ? !drawerOpen : b);
  };
  //#endregion

  //#region modal
  const toggleModalOpen = (b?: boolean) => {
    setModalOpen(b === undefined ? !modalOpen : b);
  };
  //#endregion

  //#region counts
  const incrementCounts = (k: keyof Counts) => {
    setCounts((curr) => {
      const res = { ...curr };
      res[k] += 1;
      return res;
    });
  };
  //#endregion

  //#region heroes
  const unlockHero = (h: HeroKey) => {
    setHeroes((curr) => {
      const res = { ...curr };
      res[h] = getNewHeroProps();
      return res;
    });
  };

  const unlocked = (...heroes: Array<HeroKey>) => {
    return heroes.every((h) => h in heroes);
  };

  const updateCooldown = (cooldownHeroes: Set<HeroKey>) => {
    const newHeroes = { ...heroes };
    for (const hero of TypedKeys(newHeroes)) {
      if (newHeroes[hero]!.cooldown > 0) {
        --newHeroes[hero]!.cooldown;
      } else if (cooldownHeroes.has(hero)) {
        newHeroes[hero]!.cooldown = 2;
      }
    }
    setHeroes(newHeroes);
  };

  const handleMagnetoX1 = () => {
    if (heroRoster.has("MAGNETO_X1")) {
      const newHeroes = { ...heroes };
      delete newHeroes.MAGNETO_X1;
      setHeroes(newHeroes);
    }
  };

  const killHero = (h: HeroKey) => {
    if (chained.includes(h)) return;

    setHeroes((curr) => ({
      ...curr,
      [h]: {
        ...curr[h],
        dead: true,
        cooldown: 0,
      },
    }));
  };

  const recoverHero = (h: HeroKey) => {
    setHeroes((curr) => ({
      ...curr,
      [h]: {
        ...curr[h],
        dead: false,
      },
    }));
    setCurrentAction("");
    closeToast();
  };

  const crossoverHero = (h: HeroKey) => {
    setHeroes((curr) => ({
      ...curr,
      [h]: {
        ...curr[h],
        crossover: true,
      },
    }));
    setCurrentAction("");
    closeToast();
  };

  const getLegalHeroesForFight = () => {
    if (currentAction === "choosingDeadpoolVictim") {
      return deadpoolVictims;
    }
    return TypedEntries(heroes).reduce(
      (a: Array<HeroKey>, [h, { dead, cooldown, crossover }]) => {
        return !dead &&
          cooldown === 0 &&
          (crossover || getBtnArea(currentBtnClicked) === heroAreaLookup[h])
          ? [...a, h]
          : a;
      },
      chained
    );
  };

  const isHeroClickable = (h: HeroKey) => {
    const data = heroes[h];
    if (data === undefined) return false;
    const { dead, crossover } = data;
    switch (currentAction) {
      case "resolvingRecover":
        return dead;
      case "resolvingRecoverF4":
        return isFantasticHero(h) && data.dead;
      case "spendingPortal":
        return !(crossover || dead);
      case "tradingHero":
      case "removingHero":
        return !dead;
      case "resolvingFight":
        return (
          getLegalHeroesForFight() &&
          (heroRoster.has(h) || heroRoster.size < MAX_ROSTER)
        );
      case "choosingDeadpoolVictim":
        return heroRoster.has(h);
      default:
        return false;
    }
  };

  const heroClickHandler = (h: HeroKey) => {
    switch (currentAction) {
      case "resolvingRecover":
      case "resolvingRecoverF4":
        recoverHero(h);
        break;
      case "spendingPortal":
        crossoverHero(h);
        break;
      case "choosingDeadpoolVictim":
      case "tradingHero":
      case "removingHero":
        killHero(h);
        break;
      case "resolvingFight":
        setHeroRoster(setToggler(h));
        break;
    }
  };

  const areHeroesDead = Object.values(heroes).filter((h) => h.dead).length > 0;

  const avxHeroes = TypedEntries(heroes).reduce(
    (a: Array<HeroKey>, [h, { dead, crossover }]) =>
      !dead && !crossover && heroAreaLookup[h] === "AVX" ? [...a, h] : a,
    []
  );

  const multiverseHeroes = TypedEntries(heroes).reduce(
    (a: Array<HeroKey>, [h, { dead, crossover }]) =>
      !dead && !crossover && heroAreaLookup[h] === "MULTIVERSE" ? [...a, h] : a,
    []
  );

  const crossoverHeroes = TypedEntries(heroes).reduce(
    (a: Array<HeroKey>, [h, { crossover }]) => (crossover ? [...a, h] : a),
    []
  );

  const deadHeroes = TypedEntries(heroes).reduce(
    (a: Array<HeroKey>, [h, { dead }]) => (dead ? [...a, h] : a),
    []
  );
  //#endregion

  //#region paths
  const isConnected = (p: string) => {
    return connectedPaths.has(p);
  };
  const connect = (p: string) => {
    if (isConnected(p)) return;
    setConnectedPaths((curr) => {
      const newConnectedPaths = new Set(curr);
      newConnectedPaths.add(p);
      return newConnectedPaths;
    });

    // rewards
    const rewards = pathRewards[p];
    if (rewards === undefined) return;
    if (OR_PATHS.includes(p)) {
      setOrTagChoosingQueue([...orTagChoosingQueue, rewards as Array<Tag>]);
      return;
    }

    for (const reward of rewards) {
      if (isEquipKey(reward)) {
        // EQUIPMENT REWARD
        const hero = equipmentLookup[reward];
        setEquipment((curr) => {
          const res = { ...curr };
          if (res[hero] === undefined) res[hero] = [];
          res[hero].push(reward);
          return res;
        });
      } else if (isTeamKey(reward)) {
        // TEAM REWARD
        setTeams(setAdder(reward));
      } else if (isPetKey(reward)) {
        // PET REWARD
        setPets(setAdder(reward));
      } else if (isActionType(reward)) {
        // ACTION TOKEN REWARD
        modifyActionTokens(reward, 1);
      } else if (isTag(reward)) {
        // TAG REWARD
        modifyTag(reward, 1);
        if (reward === "BOLT") {
          incrementCounts("bolts");
        }
        if (reward === "STAR") {
          incrementCounts("stars");
        }
      } else if (isSpecialReward(reward)) {
        if (reward === "CAMP_HAMMOND") {
          modifySpecialRewards("CAMP_HAMMOND", 3);
        } else {
          modifySpecialRewards(reward, 1);
          if (reward === "PORTAL") {
            incrementCounts("portals");
          }
        }
      } else if (isHeroKey(reward)) {
        unlockHero(reward);
      } else if (isMiscKey(reward)) {
        setMisc(setAdder(reward));
      } else {
        console.error(`Reward: ${reward} did not have a matching type.`);
      }
    }
  };
  //#endregion

  //#region btns
  const isCompleted = (b: string) => {
    return completedBtns.has(b);
  };

  const complete = (btnKey: string) => {
    // add connections and rewards
    setCompletedBtns(setAdder(btnKey));
    buttonToConnectedPaths(btnKey).forEach(connect);

    // Check for items connected to villain
    if (btnKey in villainInfo) {
      const { points, infinity } = villainInfo[btnKey];

      // points
      setScore(score + points);

      // chained heroes
      chained.forEach(unlockHero);

      // infinity stones
      if (infinity) {
        setInfinityStones(infinityStones.concat(infinity));
      }
    }
  };

  const canPayCost = (btn: string) => {
    if (
      COLLECTOR_BTNS.includes(btn) &&
      tags.KEY >= COLLECTOR_COSTS[counts.collector_items]
    ) {
      return true;
    }

    const { cost } = combinedButtons[btn];
    return (
      cost === undefined ||
      TypedEntries(cost).every(([tag, qtx]) => tags[tag] >= qtx)
    );
  };

  const btnClickHandler = (key: string) => {
    setCurrentBtnClicked(key);

    // STARTING KEYS
    if (key === "XMEN_START" || key === "AVENGERS_START") {
      complete(key);
      return;
    }

    const { cost } = combinedButtons[key];

    if (cost) {
      // REGULAR GATE
      for (const [key, qtx] of TypedEntries(cost)) {
        modifyTag(key, -qtx);
      }
      complete(key);
    } else if (COLLECTOR_BTNS.includes(key)) {
      // COLLECTOR ITEMS
      modifyTag("KEY", -COLLECTOR_COSTS[counts.collector_items]);
      incrementCounts("collector_items");
      complete(key);
    } else if (REMOVE_BTNS.includes(key)) {
      // REMOVE A HERO GATE
      complete(key);
      setCurrentAction("removingHero");
    } else if (key === AVX_TRADE_BTN) {
      // TRADE
      complete(AVX_TRADE_BTN);
      setCurrentAction("tradingHero");
    } else {
      // villain
      setCurrentAction("resolvingFight");
      startFight(key);
    }
  };

  const updateAvailableButtons = () => {
    if (connectedPaths.size === 1) {
      setAvailableButtons(["XMEN_START", "AVENGERS_START"]);
      return;
    }
    if (blocked) {
      setAvailableButtons([]);
      return;
    }

    // Create a set of legal buttons
    const potentialButtons = Array.from(connectedPaths)
      .map(pathToConnectedButtons)
      .flat()
      .filter((btn) => btn !== "XMEN_START" && btn !== "AVENGERS_START");
    if (tags.STAR > 0) {
      const filteredStarButtons =
        completedBtns.has("FLAME_START") || completedBtns.has("FLAME_START_2")
          ? STAR_BTNS.slice(2)
          : STAR_BTNS;
      potentialButtons.push(...filteredStarButtons);
    }

    // Phoenix Five exception
    if (
      !isCompleted(DARK_PHOENIX_BTN) &&
      PHOENIX_FIVE_BTNS.every((pfb) => isCompleted(pfb))
    ) {
      potentialButtons.push(DARK_PHOENIX_BTN);
    }

    const legalBtns = potentialButtons.filter(
      (btn) => !isCompleted(btn) && canPayCost(btn)
    );
    setAvailableButtons(legalBtns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  useEffect(updateAvailableButtons, [connectedPaths, completedBtns, blocked]);

  const getCurrentVillain = () => {
    return currentBtnClicked in villainInfo
      ? villainInfo[currentBtnClicked].key
      : null;
  };
  //#endregion

  //#region checks (mkraan crystals & infinity stones)
  // MKRAAN CRYSTAL
  useEffect(() => {
    if (isConnected(PHOENIX_FIVE_PATH)) return;
    if (specialRewards.MKRAAN_CRYSTAL >= 5 && isConnected(MKRAAN_GATE_PATH)) {
      connect(PHOENIX_FIVE_PATH);
    }
  }, [specialRewards.MKRAAN_CRYSTAL, connectedPaths]);

  // INFINITY STONE
  useEffect(() => {
    if (!isConnected(INFINITY_GAUNTLET_ROAD_PATH)) return;
    INFINITY_PATHS.slice(0, infinityStones.length)
      .filter((ip) => !isConnected(ip))
      .forEach(connect);
  }, [connectedPaths, infinityStones]);
  //#endregion

  //#region achievements
  const completeAchievement = (a: Achievement) => {
    setAchievements((curr) => ({ ...curr, [a]: true }));
  };

  const checkAchievementGate = (
    achievementKey: Achievement,
    rewardPath: string | Array<string>,
    connectedPath: string
  ) => {
    if (!Array.isArray(rewardPath)) rewardPath = [rewardPath];
    if (
      rewardPath.some((rp) => !isConnected(rp)) &&
      isConnected(connectedPath) &&
      achievements[achievementKey]
    ) {
      rewardPath.forEach(connect);
    }
  };

  useEffect(() => {
    checkAchievementGate("win_with_inhumans", "MIST_PATH_6", "MIST_PATH_31");
    checkAchievementGate("thanos_defeated", "MIST_PATH_7", "MIST_GROUP_1");
    checkAchievementGate(
      "win_with_new_avengers",
      "GALAXY_PATH_1",
      "GALAXY_PATH_2"
    );
    checkAchievementGate(
      "win_with_midnight_sons",
      "MIDNIGHT_PATH_4",
      "MIDNIGHT_PATH_5"
    );
    checkAchievementGate(
      "win_with_ebony_blade",
      "MIDNIGHT_PATH_14",
      "MIDNIGHT_PATH_13"
    );
    checkAchievementGate(
      "win_with_dark_avengers",
      "DARKNESS_PATH_24",
      "DARKNESS_PATH_23"
    );
    checkAchievementGate(
      "win_with_asgardians",
      "CASTLE_PATH_1",
      "CASTLE_PATH_2"
    );
    checkAchievementGate(
      "win_with_starjammers",
      "STARS_PATH_13",
      "STARS_PATH_15"
    );
    checkAchievementGate(
      "win_with_guardians_galaxy",
      "STARS_PATH_12",
      "STARS_PATH_11"
    );
    checkAchievementGate(
      "win_with_illuminati",
      "EXILE_PATH_8",
      "EXILE_PATH_25"
    );
    checkAchievementGate(
      "win_with_thunderbolts",
      "EXILE_PATH_14",
      "EXILE_PATH_10"
    );
    checkAchievementGate(
      "win_with_mjolnir",
      ["CASTLE_PATH_28", "CASTLE_PATH_29"],
      "CASTLE_GROUP_3"
    );
    checkAchievementGate("win_with_pet", "GALAXY_PATH_12", "GALAXY_PATH_10");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedPaths, achievements]);

  useEffect(() => {
    if (
      !achievements.unlock_colossus_and_kitty &&
      unlocked("COLOSSUS", "KITTY_PRYDE")
    ) {
      modifyActionTokens("HEROIC", 1);
      completeAchievement("unlock_colossus_and_kitty");
    }

    if (
      !achievements.unlock_jessica_and_luke &&
      unlocked("JESSICA_JONES", "LUKE_CAGE")
    ) {
      completeAchievement("unlock_jessica_and_luke");
      setActionTokens((curr) => ({ ...curr, HEROIC: curr.HEROIC + 1 }));
    }

    if (!achievements.unlock_rogue_and_gambit && unlocked("ROGUE", "GAMBIT")) {
      completeAchievement("unlock_rogue_and_gambit");
      setActionTokens((curr) => ({ ...curr, HEROIC: curr.HEROIC + 1 }));
    }

    if (
      !achievements.unlock_chod_corsair_hepzibah_raza &&
      unlocked("CHOD", "CORSAIR", "HEPZIBAH", "RAZA")
    ) {
      completeAchievement("unlock_chod_corsair_hepzibah_raza");
    }

    if (!achievements.war_machine_removed && heroes.WAR_MACHINE?.dead) {
      completeAchievement("war_machine_removed");
      modifyTag("GEAR", 1);
    }

    if (!achievements.vision_removed && heroes.VISION?.dead) {
      completeAchievement("vision_removed");
      modifyTag("GEAR", 1);
    }
  }, [heroes]);
  //#endregion

  //#region stack and reset
  const undoProps: Array<[string, any, Dispatch<SetStateAction<any>>]> = [
    ["score", score, setScore],
    ["tags", tags, setTags],
    ["actionTokens", actionTokens, setActionTokens],
    ["heroes", heroes, setHeroes],
    ["equipment", equipment, setEquipment],
    ["teams", teams, setTeams],
    ["pets", pets, setPets],
    ["misc", misc, setMisc],
    ["specialRewards", specialRewards, setSpecialRewards],
    ["infinityStones", infinityStones, setInfinityStones],
    ["completedBtns", completedBtns, setCompletedBtns],
    ["connectedPaths", connectedPaths, setConnectedPaths],
    ["achievements", achievements, setAchievements],
    ["counts", counts, setCounts],
  ];

  useEffect(
    () => {
      if (currentAction === "undoing" || currentAction === "reset2") {
        setCurrentAction("");
        return;
      }
      if (currentAction !== "") return;
      const newState = undoProps.reduce(
        (a: { [key: string]: any }, [k, v]) => ({
          ...a,
          [k]: v instanceof Set ? Array.from(v) : v,
        }),
        {}
      );
      const stringifiedState = JSON.stringify(newState);
      setStack((curr) => [...curr, stringifiedState]);
      if (connectedPaths.size > 1)
        localStorage?.setItem("save-data", stringifiedState);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    undoProps.map((v) => v[0])
  );

  const undo = useCallback(
    (loadedState?: string) => {
      setCurrentAction("undoing");
      if (!loadedState) {
        const newStack = stack.slice(0, -1);
        loadedState = newStack[newStack.length - 1];
        if (!loadedState) return;
        localStorage?.setItem("save-data", loadedState);
        setStack(newStack);
      } else {
        setStack([loadedState]);
      }
      const prevState = JSON.parse(loadedState);
      for (const [key, val, setter] of undoProps) {
        console.log(prevState[key]);
        if (val instanceof Set) {
          setter(new Set(prevState[key]));
        } else {
          setter(prevState[key]);
        }
      }
    },
    [stack]
  );
  // TODO: Uncomment when ready
  useEffect(() => {
    // const saveData = localStorage?.getItem("save-data");
    // if (saveData) {
    //   undo(saveData);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ! DANGER !
  const hardResetThatDestroysAllData = () => {
    localStorage?.removeItem("save-data");
    setScore(0);
    setCurrentBtnClicked("");
    setOrTagChoosingQueue([]);
    setTags(getStartingTags);
    setActionTokens(getStartingActionTokens());
    setHeroes(getStartingHeroes());
    setTeams(new Set());
    setEquipment(getStartingEquipment());
    setPets(new Set());
    setMisc(new Set());
    setSpecialRewards(getStartingSpecialRewards());
    setInfinityStones([]);
    setCompletedBtns(new Set());
    setConnectedPaths(getStartingConnectedPaths());
    setAchievements(getStartingAchievements());
    setCounts(getStartingCounts());
    setModalOpen(false);
    setDrawerOpen(false);
    setAvailableButtons(getStartingAvailableButtons());
    setChained([]);
    setToast({
      open: false,
      message: "",
    });
    setHeroRoster(new Set());
    setTeamRoster(new Set());
    setEquipRoster(new Set());
    setPetRoster(new Set());
    setUsingDangerRoom(false);
    setUsingCampHammond(false);
    setStack((curr) => curr.slice(0, 1));
  };
  //#endregion

  //#region modifiers
  const modifyTag = (t: Tag, qtx: number) => {
    setTags((curr) => ({
      ...curr,
      [t]: curr[t] + qtx,
    }));
  };

  const modifySpecialRewards = (sr: SpecialReward, qtx: number) => {
    setSpecialRewards((curr) => ({
      ...curr,
      [sr]: curr[sr] + qtx,
    }));
  };

  const modifyActionTokens = (a: ActionType, qtx: number) => {
    setActionTokens((curr) => ({
      ...curr,
      [a]: curr[a] + qtx,
    }));
  };

  const modifySpendingActionTokens = (a: ActionType, qtx: number) => {
    setSpendingActionTokens((curr) => ({
      ...curr,
      [a]: curr[a] + qtx,
    }));
  };
  //#endregion

  //#region or rewards queue
  useEffect(() => {
    if (orTagChoosingQueue.length) {
      setCurrentAction("choosingOrTag");
    }
  }, [orTagChoosingQueue]);
  //#endregion

  //#region tags and special rewards (e.g., recover)
  const isTagOrSpecialRewardClickable = (t: Tag | SpecialReward): boolean => {
    switch (currentAction) {
      case "choosingOrTag":
        return orTagChoosingQueue[0].includes(t as Tag);
      case "resolvingRecover":
        return (
          specialRewards.RECOVER > 0 &&
          t === "RECOVER" &&
          Object.values(heroes).some((h) => h.dead)
        );
      case "resolvingRecoverF4":
        return (
          specialRewards.RECOVER_F4 > 0 &&
          t === "RECOVER_F4" &&
          Object.values(heroes).some((h) => h.dead)
        );
      default:
        return false;
    }
  };

  const tagClickHandler = (t: Tag) => {
    if (currentAction === "choosingOrTag") {
      const newQueue = orTagChoosingQueue.slice(1);
      modifyTag(t, 1);
      setOrTagChoosingQueue(newQueue);

      if (newQueue.length === 1) {
        setCurrentAction("");
      }
    }
  };

  const specialRewardClickHandler = (sr: SpecialReward) => {
    switch (sr) {
      case "RECOVER":
        setCurrentAction("resolvingRecover");
        break;
      case "RECOVER_F4":
        setCurrentAction("resolvingRecoverF4");
        break;
    }
  };

  const isPortalButtonClickable = () => {
    return !blocked;
  };

  const portalButtonClickHandler = () => {
    setCurrentAction("spendingPortal");
  };
  //#endregion

  //#region fight resolution
  const won = () => {
    setModalOpen(false);
    setTimeout(() => {
      handleMagnetoX1();
      updateCooldown(heroRoster);
      complete(currentBtnClicked);

      // HERO ACHIEVEMENTS
      if (!achievements.win_with_beast && heroRoster.has("BEAST")) {
        completeAchievement("win_with_beast");
        modifyTag("KEY", 1);
      }
      if (!achievements.win_with_iceman && heroRoster.has("ICEMAN")) {
        completeAchievement("win_with_iceman");
        modifyActionTokens("MOVE", 1);
      }
      if (!achievements.win_with_jean && heroRoster.has("JEAN_GREY")) {
        completeAchievement("win_with_jean");
        modifyTag("BRAIN", 1);
      }
      if (!achievements.win_with_cyclops && heroRoster.has("CYCLOPS")) {
        completeAchievement("win_with_cyclops");
        modifyTag("KEY", 1);
      }
      if (!achievements.win_with_forge && heroRoster.has("FORGE")) {
        completeAchievement("win_with_forge");
        modifyTag("GEAR", 1);
      }
      if (!achievements.win_with_storm && heroRoster.has("STORM")) {
        completeAchievement("win_with_storm");
        modifyActionTokens("MOVE", 1);
      }
      if (!achievements.win_with_miles && heroRoster.has("MILES_MORALES")) {
        completeAchievement("win_with_miles");
        modifyTag("GEAR", 1);
      }
      if (!achievements.win_with_iron_man && heroRoster.has("IRON_MAN")) {
        completeAchievement("win_with_iron_man");
        modifyTag("KEY", 1);
      }
      if (!achievements.win_with_hulk && heroRoster.has("HULK")) {
        completeAchievement("win_with_hulk");
        modifyActionTokens("FIGHT", 1);
      }
      if (!achievements.win_with_cap && heroRoster.has("CAPTAIN_AMERICA")) {
        completeAchievement("win_with_cap");
        modifyTag("GEAR", 1);
      }
      if (!achievements.win_with_widow && heroRoster.has("BLACK_WIDOW")) {
        completeAchievement("win_with_widow");
        modifyTag("BRAIN", 1);
      }
      if (!achievements.win_with_wanda && heroRoster.has("SCARLET_WITCH")) {
        completeAchievement("win_with_wanda");
        modifyTag("MAGIC", 1);
      }
      if (
        !achievements.win_with_black_panther &&
        heroRoster.has("BLACK_PANTHER")
      ) {
        completeAchievement("win_with_black_panther");
        modifyTag("GEAR", 1);
      }
      if (!achievements.win_with_starlord && heroRoster.has("STAR_LORD")) {
        completeAchievement("win_with_starlord");
        modifyTag("KEY", 1);
      }
      if (!achievements.win_with_antman && heroRoster.has("ANT_MAN")) {
        completeAchievement("win_with_antman");
        modifyTag("GEAR", 1);
      }
      if (!achievements.win_with_wasp && heroRoster.has("WASP")) {
        completeAchievement("win_with_wasp");
        modifyTag("BRAIN", 1);
      }
      if (!achievements.win_with_moon_knight && heroRoster.has("MOON_KNIGHT")) {
        completeAchievement("win_with_moon_knight");
        modifyTag("MAGIC", 1);
      }
      if (!achievements.win_with_guardian && heroRoster.has("GUARDIAN")) {
        completeAchievement("win_with_guardian");
        modifyTag("MAPLE", 1);
      }
      if (!achievements.win_with_puck && heroRoster.has("PUCK")) {
        completeAchievement("win_with_puck");
        modifyTag("MAPLE", 1);
      }
      if (!achievements.win_with_sasquatch && heroRoster.has("SASQUATCH")) {
        completeAchievement("win_with_sasquatch");
        modifyTag("MAPLE", 1);
      }
      if (!achievements.win_with_snowbird && heroRoster.has("SNOWBIRD")) {
        completeAchievement("win_with_snowbird");
        modifyTag("MAPLE", 1);
      }
      if (!achievements.win_with_northstar && heroRoster.has("NORTHSTAR")) {
        completeAchievement("win_with_northstar");
        modifyTag("MAPLE", 1);
      }
      if (villainInfo[currentBtnClicked].key === "THANOS") {
        completeAchievement("thanos_defeated");
      }

      // TEAM ACHIEVEMENTS
      if (!achievements.win_with_inhumans && teamRoster.has("TEAM_INHUMANS")) {
        completeAchievement("win_with_inhumans");
      }
      if (
        !achievements.win_with_new_avengers &&
        teamRoster.has("TEAM_NEW_AVENGERS")
      ) {
        completeAchievement("win_with_new_avengers");
      }
      if (
        !achievements.win_with_midnight_sons &&
        teamRoster.has("TEAM_MIDNIGHT_SONS")
      ) {
        completeAchievement("win_with_midnight_sons");
      }
      if (
        !achievements.win_with_dark_avengers &&
        teamRoster.has("TEAM_DARK_AVENGERS")
      ) {
        completeAchievement("win_with_dark_avengers");
      }
      if (
        !achievements.win_with_asgardians &&
        teamRoster.has("TEAM_ASGARDIANS_ALLIES")
      ) {
        completeAchievement("win_with_asgardians");
      }
      if (
        !achievements.win_with_starjammers &&
        teamRoster.has("TEAM_STARJAMMERS")
      ) {
        completeAchievement("win_with_starjammers");
      }
      if (
        !achievements.win_with_guardians_galaxy &&
        teamRoster.has("TEAM_GUARDIANS_OF_THE_GALAXY")
      ) {
        completeAchievement("win_with_guardians_galaxy");
      }
      if (
        !achievements.win_with_illuminati &&
        teamRoster.has("TEAM_ILLUMINATI")
      ) {
        completeAchievement("win_with_illuminati");
      }
      if (
        !achievements.win_with_thunderbolts &&
        teamRoster.has("TEAM_RED_HULKS_THUNDERBOLTS")
      ) {
        completeAchievement("win_with_thunderbolts");
      }

      // EQUIPMENT
      if (
        !achievements.win_with_mjolnir &&
        equipRoster.has("EQUIP_THOR_MJOLNIR")
      ) {
        completeAchievement("win_with_mjolnir");
      }
      if (
        !achievements.win_with_ebony_blade &&
        equipRoster.has("EQUIP_BLACK_KNIGHT_EBONY_BLADE")
      ) {
        completeAchievement("win_with_ebony_blade");
      }

      // PETS
      if (!achievements.win_with_pet && petRoster.size > 0) {
        completeAchievement("win_with_pet");
      }

      setCurrentAction("");
      endFight();
    }, ANIM_TIME);
  };

  const lost = () => {
    setModalOpen(false);
    setTimeout(() => {
      handleMagnetoX1();
      heroRoster.forEach(killHero);
      updateCooldown(new Set());
      setCurrentAction("");
      endFight();
    }, ANIM_TIME);
  };

  const areGameResolutionButtonsClickable = () => {
    if (currentAction === "resolvingFight") {
      if (petRoster.size > heroRoster.size) return false;
      if (heroRoster.size === 0) return false;
    }
    if (currentAction === "choosingDeadpoolVictim") {
      return heroRoster.size === 1;
    }
    return true;
  };

  const resolveDeadpool = (score: number) => {
    if (
      (isConnected(DEADPOOL_PATH_20_POINTS) && score < 30) ||
      (isConnected(DEADPOOL_PATH_10_POINTS) && score < 20) ||
      (isConnected(DEADPOOL_PATH_5_POINTS) && score < 10) ||
      score < 5
    ) {
      // FAILED
      setCurrentAction("choosingDeadpoolVictim");
      setDeadpoolVictims(Array.from(heroRoster));
      setHeroRoster(new Set());
    } else {
      // SUCCESS
      updateCooldown(heroRoster);
      if (score >= 30) {
        complete(DEADPOOL_FIGHT_BTN);
        connect("AVX_DEADPOOL_D");
      } else if (score >= 20) {
        connect("AVX_DEADPOOL_C");
      } else if (score >= 10) {
        connect("AVX_DEADPOOL_B");
      } else {
        connect("AVX_DEADPOOL_A");
      }
      setCurrentAction("");
      endFight();
    }
  };

  const resolveDeadpoolVictim = () => {
    const victim = heroRoster.keys().next().value;
    if (victim === undefined) return;
    killHero(victim);
    endFight();
  };

  const startFight = (btn: string) => {
    setModalOpen(true);

    if (btn in chainedHeroes) {
      setChained(chainedHeroes[btn]);
      setHeroRoster(new Set(chainedHeroes[btn]));
    } else {
      setHeroRoster(new Set());
    }
  };

  const endFight = () => {
    setHeroRoster(new Set());
    setTeamRoster(new Set());
    setPetRoster(new Set());
    setEquipRoster(new Set());
    setChained([]);
    setActionTokens((curr) => {
      const res = { ...curr };
      res.MOVE -= spendingActionTokens.MOVE;
      res.FIGHT -= spendingActionTokens.FIGHT;
      res.HEROIC -= spendingActionTokens.HEROIC;
      res.WILD -= spendingActionTokens.WILD;
      return res;
    });
    setSpendingActionTokens({
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    });
    if (usingCampHammond) {
      setUsingCampHammond(false);
      modifySpecialRewards("CAMP_HAMMOND", -1);
    }
    if (usingDangerRoom) {
      setUsingDangerRoom(false);
      modifySpecialRewards("DANGER_ROOM", -1);
    }
  };

  const updateEquipmentTeamsAndPets = () => {
    if (teamRoster.size) {
      const team = teamRoster.keys().next().value as TeamKey;
      heroRoster.forEach((h) => {
        if (!teamToHeroLookup[team].includes(h)) {
          setTeamRoster(new Set());
        }
      });
    }
    if (equipRoster.size) {
      // TODO: Logic to remove equipment without a legal hero
    }
    if (petRoster.size > heroRoster.size) {
      openToast("You have more pets than heroes!");
    } else {
      closeToast();
    }
  };
  useEffect(updateEquipmentTeamsAndPets, [
    heroRoster,
    teamRoster,
    equipRoster,
    petRoster,
  ]);
  //#endregion

  //#region misc
  const generateTeamChoiceListProps = (): ChoiceSelectorProps<TeamKey> => {
    return {
      title: "Teams",
      subtitle: teamRoster.size
        ? translations[teamRoster.keys().next().value as TeamKey]
        : "",
      data: Array.from(teams),
      srcs: teamIconSrcs,
      selection: teamRoster,
      itemClickHandler: (t) => {
        setTeamRoster(new Set([t]));
      },
      itemClickable: (t) => {
        return (
          t === teamRoster.keys().next().value ||
          [...heroRoster].every((h) => teamToHeroLookup[t].includes(h))
        );
      },
      titleGenerator: (t) => {
        const heroes: Array<string> = getLegalHeroesForFight()
          .filter((h) => teamToHeroLookup[t].includes(h))
          .map((h) => translations[h])
          .sort();
        if (heroes.length) {
          heroes.unshift(`Your ${translations[t]} heroes:`);
          return heroes.join("\n");
        } else {
          return `You have no ${translations[t]} heroes.`;
        }
      },
    };
  };

  const generateEquipChoiceListProps = (): ChoiceSelectorProps<EquipKey> => {
    return {
      title: "Equipment",
      subtitle: equipRoster.size ? `${equipRoster.size} selected` : "",
      data: Object.values(equipment).flat(),
      srcs: equipmentIconSrcs,
      selection: equipRoster,
      itemClickHandler: (e) => {
        setEquipRoster(setToggler(e));
      },
      itemClickable: (e) => {
        return (
          equipmentLookup[e] === "GENERIC" ||
          [...heroRoster]
            .map((h) => heroEquipmentLookup[h] || [])
            .flat()
            .includes(e)
        );
      },
      titleGenerator: (e) => {
        const hero = equipmentLookup[e];
        if (isHeroKey(hero)) {
          return `${translations[e]} - ${translations[hero]}`;
        } else {
          return `${translations[e]} - Generic`;
        }
      },
    };
  };

  const generatePetChoiceListProps = (): ChoiceSelectorProps<PetKey> => {
    return {
      title: "Pets",
      subtitle: petRoster.size ? `${petRoster.size} selected` : "",
      data: Array.from(pets),
      srcs: petIconSrcs,
      selection: petRoster,
      itemClickHandler: (p) => {
        setPetRoster(setToggler(p));
      },
      itemClickable: (p) => {
        return petRoster.has(p) || petRoster.size < 4;
      },
      titleGenerator: (p) => translations[p],
    };
  };

  const resetClickHandler = (cancel = false) => {
    console.log("RESET");
    if (cancel) {
      setCurrentAction("");
      return;
    }
    if (currentAction === "reset1") {
      setCurrentAction("reset2");
    } else if (currentAction === "reset2") {
      hardResetThatDestroysAllData();
    } else {
      setCurrentAction("reset1");
    }
  };

  const getUnearnedRewardOverlaySVGPathStrings = () => {
    const combinedRewards: Array<string> = [
      ...TypedKeys(heroes),
      ...Object.values(equipment).flat(),
      ...teams,
      ...pets,
      ...misc,
    ];

    return TypedEntries(combinedOverlays).reduce(
      (acc: Array<string>, [key, d]) => {
        return combinedRewards.includes(key) ? acc : [...acc, d];
      },
      []
    );
  };

  const getVillainOverlaySVGPathStrings = () => {
    return Array.from(completedBtns).reduce((acc: Array<VillainInfo>, btn) => {
      return villainInfo[btn] ? [...acc, villainInfo[btn]] : acc;
    }, []);
  };

  const getAchievementSVGPathStrings = () => {
    const mapleCount = [
      achievements.win_with_guardian,
      achievements.win_with_puck,
      achievements.win_with_sasquatch,
      achievements.win_with_snowbird,
      achievements.win_with_northstar,
    ].filter((v) => v).length;

    return TypedKeys(achievementPaths)
      .filter((key) => {
        switch (key) {
          case "AVX_MAPLE_1":
          case "AVX_MAPLE_2":
          case "AVX_MAPLE_3":
          case "AVX_MAPLE_4":
            if (mapleCount < +key.slice(-1)) return null;
            break;
          case "STARS_BROOD_QUEEN":
            if (!isCompleted(FIRST_BROOD_QUEEN)) return null;
            break;
          default:
            if (!achievements[achievementToKeyLookup[key]!]) return null;
        }

        switch (key) {
          case "GALAXY_ROSTER_HULKLING":
            return TypedKeys(heroes).includes("HULKLING");
          case "GALAXY_ROSTER_NOVA":
            return TypedKeys(heroes).includes("NOVA");
          case "MIST_BOLTS":
            return BOLT_GATES.every(isCompleted);
          case "MIDNIGHT_8_GATES":
            return counts.portals >= 8;
          case "WAR_6_STARS_LEFT":
          case "WAR_6_STARS_RIGHT":
            return counts.stars >= 6;
          case "EXILE_12_STARS":
            return counts.stars >= 12;
          default:
            return true;
        }
      })
      .map((key) => achievementPaths[key]);
  };

  const getPathSVGPathInfo = () => {
    return Array.from(connectedPaths).map((p) => combinedPaths[p]);
  };

  const showActionTokensAccordion = () =>
    Object.values(actionTokens).reduce((a, b) => a + b) > 0;
  const toggleCampHammond = () => setUsingCampHammond(!usingCampHammond);
  const toggleDangerRoom = () => setUsingDangerRoom(!usingDangerRoom);
  //#endregion

  return {
    actionTokens,
    areHeroesDead,
    availableButtons,
    avxHeroes,
    btnClickHandler,
    chained,
    crossoverHeroes,
    currentAction,
    currentBtnClicked,
    deadHeroes,
    drawerOpen,
    equipment,
    heroes,
    generateTeamChoiceListProps,
    generatePetChoiceListProps,
    generateEquipChoiceListProps,
    getAchievementSVGPathStrings,
    getCurrentVillain,
    getLegalHeroesForFight,
    getPathSVGPathInfo,
    getUnearnedRewardOverlaySVGPathStrings,
    getVillainOverlaySVGPathStrings,
    heroClickHandler,
    heroRoster,
    isHeroClickable,
    isPortalButtonClickable,
    isTagOrSpecialRewardClickable,
    infinityStones,
    modalOpen,
    modifySpendingActionTokens,
    multiverseHeroes,
    portalButtonClickHandler,
    resetClickHandler,
    score,
    showActionTokensAccordion,
    specialRewardClickHandler,
    specialRewards,
    spendingActionTokens,
    tagClickHandler,
    tags,
    toast,
    toggleCampHammond,
    toggleDangerRoom,
    toggleDrawerOpen,
    toggleModalOpen,
    undo,
    undoDisabled: blocked || stack.length < 2,
    usingCampHammond,
    usingDangerRoom,
    areGameResolutionButtonsClickable,
    won,
    lost,
    resolveDeadpool,
    resolveDeadpoolVictim,
  };
};

interface IGameStatus {
  actionTokens: { [key in ActionType]: number };
  areHeroesDead: boolean;
  availableButtons: Array<string>;
  avxHeroes: Array<HeroKey>;
  btnClickHandler: (key: string) => void;
  chained: Array<HeroKey>;
  crossoverHeroes: Array<HeroKey>;
  currentAction: CurrentAction;
  currentBtnClicked: string;
  deadHeroes: Array<HeroKey>;
  drawerOpen: boolean;
  equipment: { [key in HeroKey | "GENERIC"]?: Array<EquipKey> };
  heroes: { [key in HeroKey]?: HeroState };
  generateTeamChoiceListProps: () => ChoiceSelectorProps<TeamKey>;
  generatePetChoiceListProps: () => ChoiceSelectorProps<PetKey>;
  generateEquipChoiceListProps: () => ChoiceSelectorProps<EquipKey>;
  getAchievementSVGPathStrings: () => Array<string>;
  getCurrentVillain: () => VillainKey | null;
  getLegalHeroesForFight: () => Array<HeroKey>;
  getPathSVGPathInfo: () => Array<Path | Array<Path>>;
  getUnearnedRewardOverlaySVGPathStrings: () => Array<string>;
  getVillainOverlaySVGPathStrings: () => Array<VillainInfo>;
  heroClickHandler: (h: HeroKey) => void;
  heroRoster: Set<HeroKey>;
  isHeroClickable: (h: HeroKey) => boolean;
  isPortalButtonClickable: () => boolean;
  isTagOrSpecialRewardClickable: (t: Tag | SpecialReward) => boolean;
  infinityStones: Array<InfinityStone>;
  modalOpen: boolean;
  modifySpendingActionTokens: (a: ActionType, q: number) => void;
  multiverseHeroes: Array<HeroKey>;
  portalButtonClickHandler: () => void;
  resetClickHandler: (cancel?: boolean) => void;
  score: number;
  showActionTokensAccordion: () => boolean;
  specialRewardClickHandler: (sr: SpecialReward) => void;
  specialRewards: { [key in SpecialReward]: number };
  spendingActionTokens: { [key in ActionType]: number };
  tagClickHandler: (t: Tag) => void;
  tags: { [key in Tag]: number };
  toast: { open: boolean; message: string };
  toggleCampHammond: () => void;
  toggleDangerRoom: () => void;
  toggleDrawerOpen: (b?: boolean) => void;
  toggleModalOpen: (b?: boolean) => void;
  undo: () => void;
  undoDisabled: boolean;
  usingCampHammond: boolean;
  usingDangerRoom: boolean;
  areGameResolutionButtonsClickable: () => boolean;
  won: () => void;
  lost: () => void;
  resolveDeadpool: (score: number) => void;
  resolveDeadpoolVictim: () => void;
}
