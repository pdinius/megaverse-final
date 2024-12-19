/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { avxSvgs } from "../assets/svg/avx";
import {
  Achievement,
  Counts,
  CurrentAction,
  DRAWER_ACTIONS,
  HeroState,
  IGameStatus,
  isAchievement,
  isCounts,
  isHeroState,
} from "../types/game-status";
import {
  ACTION_TYPES,
  Area,
  InfinityStone,
  isActionType,
  isInfinityKey,
  isSpecialReward,
  isTag,
  Tag,
} from "../types/general";
import { HeroKey, isFantasticHero, isHeroKey } from "../types/heroes";
import { isTeamKey, TeamKey } from "../types/teams";
import { EquipKey, isEquipKey } from "../types/equipment";
import { isPetKey, PetKey } from "../types/pets";
import { isMiscKey, MiscKey } from "../types/misc";
import { VillainInfo, villainInfo } from "../lib/villain-info";
import { chainedHeroes, OR_PATHS, pathRewards } from "../lib/rewards";
import {
  equipmentToHeroLookup,
  heroEquipmentLookup,
} from "../lib/equipment-lookup";
import {
  combinedButtons,
  combinedOverlays,
  combinedPaths,
} from "../lib/svg-info";
import { teamToHeroLookup } from "../lib/team-lookup";
import {
  ALPHA_FLIGHT_ACHIEVEMENTS,
  ANIM_TIME,
  AVX_TRADE_BTN,
  COLLECTOR_BTNS,
  COLLECTOR_COSTS,
  DARK_PHOENIX_BTN,
  DEADPOOL_BTN_10_POINTS,
  DEADPOOL_BTN_20_POINTS,
  DEADPOOL_BTN_30_POINTS,
  DEADPOOL_BTN_5_POINTS,
  DEADPOOL_FIGHT_BTN,
  DEADPOOL_PATH_10_POINTS,
  DEADPOOL_PATH_20_POINTS,
  DEADPOOL_PATH_5_POINTS,
  FIRST_BROOD_QUEEN,
  INFINITY_GAUNTLET_ROAD_PATH,
  INFINITY_PATHS,
  INFINITY_WATCH_CONNECTION,
  INFINITY_WATCH_PATH,
  MAX_ROSTER,
  MKRAAN_GATE_PATH,
  PHOENIX_FIVE_BTNS,
  PHOENIX_FIVE_PATH,
  REMOVE_BTNS,
  STAR_BTNS,
  THANOS_BTN,
  UNLOCK_ALL_ACHIEVEMENTS,
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
import {
  setAdder,
  setRemover,
  setToggler,
  TypedEntries,
  TypedKeys,
} from "../lib/utils";
import {
  achievementPaths,
  achievementToKeyLookup,
  unlockAllAchievementRequirements,
} from "../lib/achievements";
import { ChoiceSelectorProps } from "../components/GameSetup/ChoiceSelector/ChoiceSelector";
import { petIconSrcs } from "../lib/pet-icons";
import { translations } from "../lib/translations";
import { equipmentIconSrcs } from "../lib/equip-icons";
import { teamIconSrcs } from "../lib/team-icons";
import {
  achievementRewards,
  heroWinToAchievementLookup,
  teamWinToAchievementLookup,
} from "../lib/achievement-rewards";
import { serializeGameStatus } from "../lib/serialize-gamestate";

const getBtnArea = (btnKey: string): Area => {
  return Object.keys(avxSvgs.buttons).includes(btnKey) ? "AVX" : "MULTIVERSE";
};

export const useGameStatus = (testing: boolean): IGameStatus => {
  const [currentAction, setCurrentAction] = useState<CurrentAction>("");
  const [currentBtnClicked, setCurrentBtnClicked] = useState("");
  const [orTagChoosingQueue, setOrTagChoosingQueue] = useState<
    Array<Array<Tag>>
  >([]);
  const [tags, setTags] = useState(getStartingTags(testing));
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
  const [debugging, setDebugging] = useState(false);

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
    if (DRAWER_ACTIONS.includes(currentAction)) {
      toggleDrawerOpen(true);
    }
    if (orTagChoosingQueue.length > 0) {
      const [A, B] = orTagChoosingQueue[0];
      toggleDrawerOpen(true);
      openToast(
        `Choose to gain a${/^[AEIOU]/.test(A) ? "n" : ""} ${A} or a${
          /^[AEIOU]/.test(A) ? "n" : ""
        } ${B}.`
      );
      return;
    }
    switch (currentAction) {
      case "tradingHero":
      case "removingHero":
        openToast("Choose a hero to remove.");
        break;
      case "choosingDeadpoolVictim":
        openToast("Choose a hero to lose from the Deadpool fight.");
        break;
      case "pushToStack":
        pushToStack();
        setCurrentAction("");
        break;
      case "resolvingFight":
        toggleDrawerOpen(false);
        break;
      default:
        closeToast();
    }
  }, [currentAction, orTagChoosingQueue]);
  //#endregion

  //#region drawer
  const toggleDrawerOpen = (b?: boolean) => {
    setDrawerOpen(b === undefined ? !drawerOpen : b);
  };

  const getScore = () => {
    return Array.from(completedBtns).reduce(
      (a, b) => a + (villainInfo[b]?.points || 0),
      0
    );
  };
  //#endregion

  //#region modal
  const toggleModalOpen = (b?: boolean) => {
    const newModalOpen = b === undefined ? !modalOpen : b;
    setModalOpen(newModalOpen);
    if (newModalOpen === false) {
      setCurrentAction("");
      setTeamRoster(new Set());
      setChained([]);
      resetFight();
    }
  };
  //#endregion

  //#region counts
  const incrementCounts = (k: keyof Counts) => {
    setCounts((curr) => {
      const res = { ...curr };
      ++res[k];
      return res;
    });
  };
  //#endregion

  //#region heroes
  const unlockHero = (h: HeroKey, from: Area) => {
    if (h === "SCARLET_WITCH_2" && "SCARLET_WITCH" in heroes) return;
    if (h === "SCARLET_WITCH" && "SCARLET_WITCH_2" in heroes) return;
    if (h === "QUICKSILVER_2" && "QUICKSILVER" in heroes) return;
    if (h === "QUICKSILVER" && "QUICKSILVER_2" in heroes) return;

    setHeroes((curr) => {
      const res = { ...curr };
      if (h === "SILVER_SURFER_2" && "SILVER_SURFER" in res) {
        res.SILVER_SURFER!.crossover = true;
      } else if (h === "SILVER_SURFER" && "SILVER_SURFER_2" in res) {
        res.SILVER_SURFER_2!.crossover = true;
      } else {
        res[h] = getNewHeroProps(chained.includes(h), from);
      }

      UNLOCK_ALL_ACHIEVEMENTS.forEach((a) => {
        if (
          !achievements[a] &&
          unlockAllAchievementRequirements[a]?.every((h) => h in res)
        ) {
          completeAchievement(a);
        }
      });

      return res;
    });
  };

  const updateCooldown = (cooldownHeroes: Set<HeroKey>) => {
    setHeroes((curr) => {
      const res = { ...curr };

      for (const hero of TypedKeys(res)) {
        if (res[hero]!.cooldown > 0) {
          --res[hero]!.cooldown;
        } else if (cooldownHeroes.has(hero)) {
          res[hero]!.cooldown = 2;
        }
      }

      return res;
    });
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

    if (!achievements["war_machine_removed"] && "WAR_MACHINE") {
      completeAchievement("war_machine_removed");
    }

    if (!achievements["vision_removed"] && h === "VISION") {
      completeAchievement("vision_removed");
    }

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
    if (currentAction === "resolvingRecover") {
      modifySpecialRewards("RECOVER", -1);
    }
    if (currentAction === "resolvingRecoverF4") {
      modifySpecialRewards("RECOVER_F4", -1);
    }
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
    modifySpecialRewards("PORTAL", -1);
    setCurrentAction("");
    closeToast();
  };

  const getLegalHeroesForFight = () => {
    if (currentAction === "choosingDeadpoolVictim") {
      return deadpoolVictims;
    }
    return TypedEntries(heroes)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .reduce((a: Array<HeroKey>, [h, { dead, cooldown, crossover, area }]) => {
        return !dead &&
          cooldown === 0 &&
          (crossover || getBtnArea(currentBtnClicked) === area)
          ? [...a, h]
          : a;
      }, chained);
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
        return deadpoolVictims.includes(h);
      default:
        return false;
    }
  };

  const heroClickHandler = (h: HeroKey) => {
    switch (currentAction) {
      case "resolvingRecover":
      case "resolvingRecoverF4":
        recoverHero(h);
        setCurrentAction("pushToStack");
        break;
      case "spendingPortal":
        crossoverHero(h);
        setCurrentAction("pushToStack");
        break;
      case "tradingHero":
        killHero(h);
        setCurrentAction("resolvingRecover");
        break;
      case "removingHero":
        killHero(h);
        complete(currentBtnClicked);
        setCurrentAction("pushToStack");
        break;
      case "choosingDeadpoolVictim":
      case "resolvingFight":
        setHeroRoster(setToggler(h));
        break;
    }
  };

  const areHeroesDead = Object.values(heroes).filter((h) => h.dead).length > 0;

  const avxHeroes = TypedEntries(heroes)
    .reduce(
      (a: Array<HeroKey>, [h, { dead, crossover, area }]) =>
        !dead && !crossover && area === "AVX" ? [...a, h] : a,
      []
    )
    .sort();

  const multiverseHeroes = TypedEntries(heroes)
    .reduce(
      (a: Array<HeroKey>, [h, { dead, crossover, area }]) =>
        !dead && !crossover && area === "MULTIVERSE" ? [...a, h] : a,
      []
    )
    .sort();

  const crossoverHeroes = TypedEntries(heroes)
    .reduce(
      (a: Array<HeroKey>, [h, { crossover }]) => (crossover ? [...a, h] : a),
      []
    )
    .sort();

  const deadHeroes = TypedEntries(heroes)
    .reduce((a: Array<HeroKey>, [h, { dead }]) => (dead ? [...a, h] : a), [])
    .sort();
  //#endregion

  //#region paths
  useEffect(() => {
    if (isConnected(INFINITY_WATCH_CONNECTION) && isCompleted(THANOS_BTN)) {
      connect(INFINITY_WATCH_PATH);
    }
    if (counts.stars >= 6 && isConnected("WAR_PATH_22")) {
      connect("WAR_PATH_21");
    }
    if (counts.stars >= 6 && isConnected("WAR_PATH_18")) {
      connect("WAR_PATH_17");
    }
    if (counts.stars >= 12 && isConnected("EXILE_PATH_13")) {
      connect("EXILE_PATH_12");
    }
    if (counts.portals >= 8 && isConnected("MIDNIGHT_PATH_31")) {
      connect("MIDNIGHT_PATH_33");
    }
    if (counts.bolts >= 9 && isConnected("MIST_PATH_11")) {
      connect("MIST_PATH_2");
    }
    if ("HULKLING" in heroes && isConnected("GALAXY_PATH_10")) {
      connect("GALAXY_PATH_11");
    }
    if ("NOVA" in heroes && isConnected("GALAXY_PATH_20")) {
      connect("GALAXY_PATH_18");
    }
  }, [connectedPaths, completedBtns, heroes, counts]);

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
      setOrTagChoosingQueue((curr) => [...curr, rewards as Array<Tag>]);
      return;
    }

    for (const reward of rewards) {
      if (isEquipKey(reward)) {
        // EQUIPMENT REWARD
        const hero = equipmentToHeroLookup[reward];
        setEquipment((curr) => {
          const res = { ...curr };
          if (res[hero] === undefined) res[hero] = [];
          if (!res[hero].includes(reward)) res[hero].push(reward);
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
        unlockHero(reward, p.startsWith("AVX") ? "AVX" : "MULTIVERSE");
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
      const { infinity } = villainInfo[btnKey];

      // chained heroes
      chained.forEach((h) => unlockHero(h, getBtnArea(btnKey)));

      // infinity stones
      if (infinity) {
        setInfinityStones(infinityStones.concat(infinity));
      }
    }
  };

  const canPayCost = (btn: string) => {
    if (COLLECTOR_BTNS.includes(btn)) {
      return tags.KEY >= COLLECTOR_COSTS[counts.collector_items];
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

    const { cost } = combinedButtons[key];

    if (key === "XMEN_START" || key === "AVENGERS_START") {
      complete(key);
      setCurrentAction("pushToStack");
    } else if (cost) {
      // REGULAR GATE
      for (const [key, qtx] of TypedEntries(cost)) {
        modifyTag(key, -qtx);
      }
      complete(key);
      setCurrentAction("pushToStack");
    } else if (COLLECTOR_BTNS.includes(key)) {
      // COLLECTOR ITEMS
      modifyTag("KEY", -COLLECTOR_COSTS[counts.collector_items]);
      incrementCounts("collector_items");
      complete(key);
      setCurrentAction("pushToStack");
    } else if (REMOVE_BTNS.includes(key)) {
      // REMOVE A HERO GATE
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
      .filter((btn) => !btn.includes("START"));
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
  const completeAchievementGate = (
    rewardPath: Array<string>,
    connectedPath: string
  ) => {
    if (
      rewardPath.some((rp) => !isConnected(rp)) &&
      isConnected(connectedPath)
    ) {
      rewardPath.forEach(connect);
    }
  };

  const completeAchievement = (achievement: Achievement) => {
    const reward = achievementRewards[achievement];
    if (Array.isArray(reward)) {
      completeAchievementGate(...reward);
    } else if (isTag(reward)) {
      modifyTag(reward, 1);
    } else if (isActionType(reward)) {
      modifyActionTokens(reward, 1);
    }
    if (ALPHA_FLIGHT_ACHIEVEMENTS.includes(achievement)) {
      incrementCounts("maple");
    }
    setAchievements((curr) => ({
      ...curr,
      [achievement]: true,
    }));
  };
  //#endregion

  //#region stack and reset
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const undoProps: Array<[string, any, Dispatch<SetStateAction<any>>]> = [
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

  const serializeState = (state: string) => {
    try {
      if (!isLegalStateData(state)) {
        throw Error("stack contained an illegal state.");
      }
      const parsed = JSON.parse(state);
      return serializeGameStatus(parsed);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLegalStateData = (s: string): boolean => {
    try {
      const o = JSON.parse(s);

      if (Object.keys(o).length !== undoProps.length) {
        return false;
      }
      if (
        typeof o.tags !== "object" ||
        Object.entries(o.tags).some(
          ([k, v]) => !isTag(k) || typeof v !== "number"
        )
      ) {
        return false;
      }
      if (
        typeof o.actionTokens !== "object" ||
        Object.entries(o.actionTokens).some(
          ([k, v]) => !isActionType(k) || typeof v !== "number"
        )
      ) {
        return false;
      }
      if (
        typeof o.heroes !== "object" ||
        Object.entries(o.heroes).some(
          ([k, v]) => !isHeroKey(k) || !isHeroState(v)
        )
      ) {
        return false;
      }
      if (
        typeof o.equipment !== "object" ||
        Object.entries(o.equipment).some(
          ([k, v]) =>
            !(isHeroKey(k) || k === "GENERIC") ||
            !Array.isArray(v) ||
            !v.every((e) => isEquipKey(e))
        )
      ) {
        return false;
      }
      if (
        !Array.isArray(o.teams) ||
        !o.teams.every((t: string) => typeof t === "string" && isTeamKey(t))
      ) {
        return false;
      }
      if (
        !Array.isArray(o.pets) ||
        !o.pets.every((p: string) => typeof p === "string" && isPetKey(p))
      ) {
        return false;
      }
      if (
        !Array.isArray(o.misc) ||
        !o.misc.every((m: string) => typeof m === "string" && isMiscKey(m))
      ) {
        return false;
      }
      if (
        typeof o.specialRewards !== "object" ||
        Object.entries(o.specialRewards).some(
          ([k, v]) => !isSpecialReward(k) || typeof v !== "number"
        )
      ) {
        return false;
      }
      if (
        !Array.isArray(o.infinityStones) ||
        !o.infinityStones.every(
          (inf: string) => typeof inf === "string" && isInfinityKey(inf)
        )
      ) {
        return false;
      }
      if (
        !Array.isArray(o.completedBtns) ||
        !o.completedBtns.every((s: string) => typeof s === "string")
      ) {
        return false;
      }
      if (
        !Array.isArray(o.connectedPaths) ||
        !o.connectedPaths.every((s: string) => typeof s === "string")
      ) {
        return false;
      }
      if (
        typeof o.achievements !== "object" ||
        Object.entries(o.achievements).some(
          ([k, v]) => !isAchievement(k) || typeof v !== "boolean"
        )
      ) {
        return false;
      }
      if (typeof o.counts !== "object" || !isCounts(o.counts)) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  };

  const loadState = (s: string) => {
    const state = JSON.parse(s);
    for (const [key, val, setter] of undoProps) {
      if (val instanceof Set) {
        setter(new Set(state[key]));
      } else {
        setter(state[key]);
      }
    }
  };

  const undo = () => {
    const newStack = stack.slice();
    newStack.pop();
    const prevState = newStack.slice(-1)[0];
    if (!prevState) return;
    loadState(prevState);
    setStack(newStack);
  };

  const getCode = () => {
    return serializeState(stack[stack.length - 1]);
  };

  useEffect(() => {
    // initial load data
    const saveData = localStorage?.getItem("save-data");
    if (saveData && isLegalStateData(saveData)) {
      loadState(saveData);
      setStack([saveData]);
      return;
    }
    pushToStack();
  }, []);

  const pushToStack = () => {
    const stringifiedState = JSON.stringify(
      undoProps.reduce(
        (a: { [key: string]: unknown }, [k, v]) => ({
          ...a,
          [k]: v instanceof Set ? Array.from(v) : v,
        }),
        {}
      )
    );

    // CHECK FOR DUPE STATE
    if (stack[stack.length - 1] === stringifiedState) {
      console.error("attempted to push duplicate state");
      return;
    }

    // UPDATE STACK AND SAVE DATA
    setStack([...stack, stringifiedState]);
    localStorage?.setItem("save-data", stringifiedState);
  };

  // ! DANGER !
  const hardResetThatDestroysAllData = () => {
    localStorage?.removeItem("save-data");
    setCurrentBtnClicked("");
    setOrTagChoosingQueue([]);
    setTags(() => getStartingTags(testing));
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
    setStack([]);
    setCurrentAction("pushToStack");
  };
  //#endregion

  //#region modifiers
  const modifier =
    <T extends string>(
      setter: Dispatch<SetStateAction<{ [key in T]: number }>>
    ) =>
    (key: T, qtx: number) => {
      setter((curr) => {
        const res = { ...curr };
        res[key] += qtx;
        return res;
      });
    };

  const modifyTag = modifier(setTags);
  const modifySpecialRewards = modifier(setSpecialRewards);
  const modifyActionTokens = modifier(setActionTokens);
  const modifySpendingActionTokens = modifier(setSpendingActionTokens);
  //#endregion

  //#region tags and special rewards (e.g., recover)
  const isTagClickable = (t: Tag): boolean => {
    if (orTagChoosingQueue.length) {
      return (
        orTagChoosingQueue.length > 0 &&
        orTagChoosingQueue[0].includes(t as Tag)
      );
    }
    return false;
  };

  const tagClickHandler = (t: Tag) => {
    if (orTagChoosingQueue.length) {
      const newQueue = orTagChoosingQueue.slice(1);
      modifyTag(t, 1);
      setOrTagChoosingQueue(newQueue);

      if (newQueue.length === 0) {
        setCurrentAction("pushToStack");
      }
    }
  };

  const isRecoverButtonClickable = (r: "RECOVER" | "RECOVER_F4"): boolean => {
    if (r === "RECOVER" && currentAction === "resolvingRecover") return true;
    if (r === "RECOVER_F4" && currentAction === "resolvingRecoverF4")
      return true;
    if (blocked) return false;
    switch (r) {
      case "RECOVER":
        return (
          specialRewards.RECOVER > 0 &&
          Object.values(heroes).some((h) => h.dead)
        );
      case "RECOVER_F4":
        return (
          specialRewards.RECOVER_F4 > 0 &&
          TypedEntries(heroes).some(([h, s]) => isFantasticHero(h) && s.dead)
        );
      default:
        return false;
    }
  };

  const recoverButtonClickHandler = (r: "RECOVER" | "RECOVER_F4") => {
    switch (r) {
      case "RECOVER":
        if (currentAction === "resolvingRecover") {
          setCurrentAction("");
        } else {
          setCurrentAction("resolvingRecover");
        }
        break;
      case "RECOVER_F4":
        if (currentAction === "resolvingRecoverF4") {
          setCurrentAction("");
        } else {
          setCurrentAction("resolvingRecoverF4");
        }
        break;
    }
  };

  const isPortalButtonClickable = () => {
    return currentAction === "spendingPortal"
      ? true
      : !blocked && specialRewards.PORTAL > 0;
  };

  const portalButtonClickHandler = () => {
    if (currentAction === "spendingPortal") {
      setCurrentAction("");
    } else {
      setCurrentAction("spendingPortal");
    }
  };
  //#endregion

  //#region fight resolution
  const won = () => {
    handleMagnetoX1();
    updateCooldown(heroRoster);
    complete(currentBtnClicked);

    // HERO ACHIEVEMENTS
    for (const hero of heroRoster) {
      const achievement = heroWinToAchievementLookup[hero];
      if (achievement && achievements[achievement] === false) {
        completeAchievement(achievement);
      }
    }

    // TEAM ACHIEVEMENTS
    for (const team of teamRoster) {
      const achievement = teamWinToAchievementLookup[team];
      if (achievement && achievements[achievement] === false) {
        completeAchievement(achievement);
      }
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

    spendFightResources();
    toggleModalOpen(false);
  };

  const lost = () => {
    handleMagnetoX1();
    heroRoster.forEach(killHero);
    updateCooldown(new Set());
    ACTION_TYPES.forEach((at) =>
      modifyActionTokens(at, -spendingActionTokens[at])
    );
    spendFightResources();
    toggleModalOpen(false);
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
      toggleModalOpen(false);
      setTimeout(() => {
        updateCooldown(heroRoster);
        if (score >= 30) {
          complete(DEADPOOL_FIGHT_BTN);
          complete(DEADPOOL_BTN_30_POINTS);
        } else if (score >= 20) {
          complete(DEADPOOL_BTN_20_POINTS);
        } else if (score >= 10) {
          complete(DEADPOOL_BTN_10_POINTS);
        } else {
          complete(DEADPOOL_BTN_5_POINTS);
        }
        toggleModalOpen(false);
      }, ANIM_TIME);
    }
  };

  const resolveDeadpoolVictim = () => {
    const victim = heroRoster.keys().next().value;
    if (victim === undefined) return;
    killHero(victim);
    toggleModalOpen(false);
  };

  const startFight = (btn: string) => {
    toggleModalOpen(true);

    if (btn in chainedHeroes) {
      setChained(chainedHeroes[btn]);
      setHeroRoster(new Set(chainedHeroes[btn]));
    } else {
      setHeroRoster(new Set());
    }
  };

  const spendFightResources = () => {
    ACTION_TYPES.forEach((at) =>
      modifyActionTokens(at, -spendingActionTokens[at])
    );

    if (usingCampHammond) {
      modifySpecialRewards("CAMP_HAMMOND", -1);
    }
    if (usingDangerRoom) {
      modifySpecialRewards("DANGER_ROOM", -1);
    }
  };

  const resetFight = () => {
    setHeroRoster(new Set());
    setTeamRoster(new Set());
    setPetRoster(new Set());
    setEquipRoster(new Set());
    setChained([]);
    setUsingCampHammond(false);
    setUsingDangerRoom(false);
    setSpendingActionTokens({
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    });
    setCurrentAction("pushToStack");
  };

  const updateEquipmentTeamsAndPets = () => {
    if (currentAction !== "resolvingFight") return;
    if (teamRoster.size) {
      const team = teamRoster.keys().next().value as TeamKey;
      if (team !== "TEAM_UNITED_HEROES") {
        heroRoster.forEach((h) => {
          if (!teamToHeroLookup[team].includes(h)) {
            setTeamRoster(new Set());
          }
        });
      }
    }
    if (equipRoster.size) {
      equipRoster.forEach((e) => {
        const hero = equipmentToHeroLookup[e];
        if (hero !== "GENERIC" && !heroRoster.has(hero)) {
          setEquipRoster(setRemover(e));
        }
      });
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
      data: Array.from(teams).filter((team) => {
        return teamToHeroLookup[team].some((hero) =>
          getLegalHeroesForFight().includes(hero)
        );
      }),
      srcs: teamIconSrcs,
      selection: teamRoster,
      itemClickHandler: (t) => {
        if (teamRoster.keys().next().value === t) {
          setTeamRoster(new Set());
        } else {
          setTeamRoster(new Set([t]));
        }
      },
      itemClickable: (t) => {
        return (
          t === "TEAM_UNITED_HEROES" ||
          t === teamRoster.keys().next().value ||
          [...heroRoster].every((h) => teamToHeroLookup[t].includes(h))
        );
      },
      titleGenerator: (t) => {
        if (t === "TEAM_UNITED_HEROES") {
          return `All heroes may be used.`;
        }
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
      data: TypedEntries(equipment).reduce(
        (a: Array<EquipKey>, [hero, equipment]) => {
          if (hero === "GENERIC" || getLegalHeroesForFight().includes(hero)) {
            return a.concat(equipment);
          } else {
            return a;
          }
        },
        []
      ),
      srcs: equipmentIconSrcs,
      selection: equipRoster,
      itemClickHandler: (e) => {
        setEquipRoster(setToggler(e));
      },
      itemClickable: (e) => {
        // check for too many total equips
        if (equipRoster.size >= heroRoster.size * 3) {
          return equipRoster.has(e);
        }

        // check for three equips on one hero
        let currentEquipmentsForHero = 0;
        const hero = equipmentToHeroLookup[e];
        for (const equip of equipRoster) {
          if (equipmentToHeroLookup[equip] === hero) {
            ++currentEquipmentsForHero;
          }
        }
        if (currentEquipmentsForHero >= 3) return false;

        // regular checks
        return (
          equipmentToHeroLookup[e] === "GENERIC" ||
          [...heroRoster]
            .map((h) => heroEquipmentLookup[h] || [])
            .flat()
            .includes(e)
        );
      },
      titleGenerator: (e) => {
        const hero = equipmentToHeroLookup[e];
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
    return TypedKeys(achievementPaths)
      .filter((key) => {
        const achievementName = achievementToKeyLookup[key];

        switch (key) {
          case "AVX_MAPLE_1":
          case "AVX_MAPLE_2":
          case "AVX_MAPLE_3":
          case "AVX_MAPLE_4":
            if (counts.maple < +key.slice(-1)) return null;
            break;
          case "STARS_BROOD_QUEEN":
            if (!isCompleted(FIRST_BROOD_QUEEN)) return null;
            break;
          case "MIST_BEAT_THANOS":
            if (!isCompleted(THANOS_BTN)) return null;
            break;
          default:
            if (achievementName && achievements[achievementName] === false)
              return null;
        }

        switch (key) {
          case "GALAXY_ROSTER_HULKLING":
            return TypedKeys(heroes).includes("HULKLING");
          case "GALAXY_ROSTER_NOVA":
            return TypedKeys(heroes).includes("NOVA");
          case "MIST_BOLTS":
            return counts.bolts >= 9;
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
    return Array.from(connectedPaths).map((p) => ({ key: p, props: combinedPaths[p] }));
  };

  const showActionTokensAccordion = () =>
    Object.values(actionTokens).reduce((a, b) => a + b) > 0;
  const toggleCampHammond = () => setUsingCampHammond(!usingCampHammond);
  const toggleDangerRoom = () => setUsingDangerRoom(!usingDangerRoom);
  //#endregion

  //#region debugging screen
  const toggleDebuggingMode = () => {
    setDebugging(!debugging);
  };

  const loadFromDebugOnClick = (state: string) => {
    loadState(state);
    toggleDebuggingMode();
    setCurrentAction("pushToStack");
  };
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
    debugging,
    toggleDebuggingMode,
    currentState: stack[stack.length - 1],
    isLegalStateData,
    loadFromDebugOnClick,
    drawerOpen,
    equipment,
    heroes,
    generateTeamChoiceListProps,
    generatePetChoiceListProps,
    generateEquipChoiceListProps,
    getAchievementSVGPathStrings,
    getCode,
    getCurrentVillain,
    getLegalHeroesForFight,
    getPathSVGPathInfo,
    getScore,
    getUnearnedRewardOverlaySVGPathStrings,
    getVillainOverlaySVGPathStrings,
    heroClickHandler,
    heroRoster,
    isHeroClickable,
    isPortalButtonClickable,
    isTagClickable,
    infinityStones,
    modalOpen,
    modifySpendingActionTokens,
    multiverseHeroes,
    portalButtonClickHandler,
    resetClickHandler,
    showActionTokensAccordion,
    isRecoverButtonClickable,
    recoverButtonClickHandler,
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
    team: teamRoster.keys().next().value,
    testing,
  };
};
