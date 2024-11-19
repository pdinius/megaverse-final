import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { avxSvgs } from "../assets/svg/avx";
import { Achievements, CurrentAction, IGameStatus } from "../types/game-status";
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
import { btnToPathConnections, pathToBtnConnections } from "../lib/connections";
import { villainInfo } from "../lib/villain-info";
import { chainedHeroes, OR_PATHS, pathRewards } from "../lib/rewards";
import { equipmentLookup, heroEquipmentLookup } from "../lib/equipment-lookup";
import { combinedButtons, combinedOverlays } from "../lib/svg-info";
import { heroAreaLookup } from "../lib/hero-area-lookup";
import { teamToHeroLookup } from "../lib/team-lookup";
import { ChoiceSelectorProps } from "../components/GameSetup/ChoiceSelector/ChoiceSelector";
import { translations } from "../lib/translations";
import { teamIconSrcs } from "../lib/team-icons";
import { equipmentIconSrcs } from "../lib/equip-icons";
import { petIconSrcs } from "../lib/pet-icons";

const getArea = (btnKey: string): Area => {
  return Object.keys(avxSvgs.buttons).includes(btnKey) ? "AVX" : "MULTIVERSE";
};

const REMOVE_HERO = (h: HeroKey) => (curr: Array<HeroKey>) => {
  const res = [...curr];
  const idx = res.indexOf(h);
  res.splice(idx, 1);
  return res;
};

const setToggler =
  <T>(el: T) =>
  (curr: Set<T>) => {
    const res = new Set(curr);
    if (res.has(el)) {
      res.delete(el);
    } else {
      res.add(el);
    }
    return res;
  };

const STAR_BTNS = [
  "FLAME_START",
  "FLAME_START_2",
  "MIST_START",
  "GALAXY_START",
  "FEAR_START",
  "ABYSS_START",
  "FOOL_START",
  "MIDNIGHT_START",
  "WAR_START",
  "SHIELD_START",
  "DARKNESS_START",
  "CASTLE_START",
  "STARS_START",
  "EXILE_START",
  "FINALITY_START",
  "CHARIOT_START",
];

const INFINITY_PATHS = [
  "AVX_PATH_236",
  "AVX_PATH_237",
  "AVX_PATH_238",
  "AVX_PATH_239",
  "AVX_PATH_240",
  "AVX_PATH_241",
];

const COLLECTOR_BTNS = [
  "GALAXY_SPECIAL_11",
  "GALAXY_SPECIAL_12",
  "GALAXY_SPECIAL_13",
  "GALAXY_SPECIAL_14",
  "GALAXY_SPECIAL_15",
];
const COLLECTOR_COSTS = [0, 1, 1, 2, 3];

const REMOVE_BTNS = [
  "AVX_SPECIAL_241",
  "AVX_SPECIAL_242",
  "MIDNIGHT_SPECIAL_19",
  "MIDNIGHT_SPECIAL_20",
  "MIDNIGHT_SPECIAL_21",
];

export const useGameStatus = (): IGameStatus => {
  const [score, setScore] = useState(0);
  const [currentAction, setCurrentAction] = useState<CurrentAction>("");
  const [currentBtnClicked, setCurrentBtnClicked] = useState("");
  const [orTagChoosingQueue, setOrTagChoosingQueue] = useState<
    Array<Array<Tag>>
  >([]);
  const [tags, setTags] = useState<{ [key in Tag]: number }>({
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
    STAR: 0,
    SPARKLE: 0,
  });
  const [actionTokens, setActionTokens] = useState<{
    [key in ActionType]: number;
  }>({
    MOVE: 0,
    FIGHT: 0,
    HEROIC: 0,
    WILD: 0,
  });
  const [heroesAvX, setHeroesAvX] = useState<Array<HeroKey>>([]);
  const [heroesMultiverse, setHeroesMultiverse] = useState<Array<HeroKey>>([
    "BLACK_PANTHER_SHURI",
    "CAPTAIN_CARTER",
    "IRONHEART",
    "MIGHTY_THOR",
  ]);
  const [heroesCrossover, setHeroesCrossover] = useState<Array<HeroKey>>([]);
  const [heroesDead, setHeroesDead] = useState<Array<HeroKey>>([]);
  const [cooldown, setCooldown] = useState<[Array<HeroKey>, Array<HeroKey>]>([
    [],
    [],
  ]);
  const [teams, setTeams] = useState<Array<TeamKey>>([]);
  const [equipment, setEquipment] = useState<{
    [key in HeroKey | "GENERIC"]?: Array<EquipKey>;
  }>({
    GENERIC: [],
  });
  const [pets, setPets] = useState<Array<PetKey>>([]);
  const [misc, setMisc] = useState<Array<MiscKey>>([]);
  const [specialRewards, setSpecialRewards] = useState<{
    [key in SpecialReward]: number;
  }>({
    DANGER_ROOM: 0,
    CAMP_HAMMOND: 0,
    RECOVER: 0,
    RECOVER_F4: 0,
    TRADE: 0,
    MKRAAN_CRYSTAL: 0,
    PORTAL: 2,
  });
  const [infinityStones, setInfinityStones] = useState<Array<InfinityStone>>(
    []
  );
  const [completed, setCompleted] = useState<Array<string>>([]);
  const [connected, setConnected] = useState<Array<string>>([
    "JOURNEY_GROUP_1",
  ]);
  const [achievements, setAchievements] = useState<Achievements>({
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
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [availableButtons, setAvailableButtons] = useState<Array<string>>([
    "XMEN_START",
    "AVENGERS_START",
  ]);
  const [heroChoices, setHeroChoices] = useState<Array<HeroKey>>([]);
  const [roster, setRoster] = useState<Set<HeroKey>>(new Set());
  const [stack, setStack] = useState<Array<string>>([]);
  const [undoing, setUndoing] = useState(false);
  const [chained, setChained] = useState<Array<HeroKey>>([]);
  const [toast, setToast] = useState("");
  const [collectorsBought, setCollectorsBought] = useState(0);
  const [teamRoster, setTeamRoster] = useState<Set<TeamKey>>(new Set());
  const [equipRoster, setEquipRoster] = useState<Set<EquipKey>>(new Set());
  const [petRoster, setPetRoster] = useState<Set<PetKey>>(new Set());
  const [useDangerRoom, setUseDangerRoom] = useState(false);
  const [useCampHammond, setUseCampHammond] = useState(false);
  const [spentActionTokens, setSpentActionTokens] = useState<{
    [key in ActionType]: number;
  }>({
    MOVE: 0,
    FIGHT: 0,
    HEROIC: 0,
    WILD: 0,
  });

  // MKRAAN CRYSTAL CHECK
  useEffect(() => {
    if (connected.includes("AVX_PATH_217")) return;
    if (
      specialRewards.MKRAAN_CRYSTAL >= 5 &&
      connected.includes("AVX_PATH_216")
    ) {
      setConnected((curr) => [...curr, "AVX_PATH_217"]);
    }
  }, [specialRewards.MKRAAN_CRYSTAL, connected]);

  // INFINITY STONE CHECK
  useEffect(() => {
    if (!connected.includes("AVX_PATH_235")) return;
    const newPaths = INFINITY_PATHS.slice(0, infinityStones.length).filter(
      (p) => !connected.includes(p)
    );
    setConnected([...connected, ...newPaths]);
  }, [connected, infinityStones]);

  // UPDATE AVAILABLE BUTTONS
  useEffect(() => {
    if (connected.length === 1) {
      setAvailableButtons(["XMEN_START", "AVENGERS_START"]);
      return;
    }
    if (currentAction !== "") {
      setAvailableButtons([]);
      return;
    }

    // Create a set of legal buttons
    const legalBtns = new Set(
      connected
        .map((path) => pathToBtnConnections[path])
        .flat()
        .filter((btn) => !completed.includes(btn) && canPayCost(btn))
    );

    // if we have a star, add STAR_BTNS
    if (tags.STAR > 0) {
      const filteredStarButtons =
        completed.includes("FLAME_START") || completed.includes("FLAME_START_2")
          ? STAR_BTNS.slice(2)
          : STAR_BTNS;
      filteredStarButtons.forEach((sb) => {
        if (completed.includes(sb)) return;
        legalBtns.add(sb);
      });
    }

    // Phoenix Five exception
    if (
      !completed.includes("AVX_DARK_PHOENIX_229") &&
      completed.includes("AVX_MAGIK_PHOENIX_FIVE_224") &&
      completed.includes("AVX_COLOSSUS_PHOENIX_FIVE_228") &&
      completed.includes("AVX_EMMA_FROST_PHOENIX_FIVE_227") &&
      completed.includes("AVX_CYCLOPS_PHOENIX_FIVE_226") &&
      completed.includes("AVX_NAMOR_PHOENIX_FIVE_225")
    ) {
      legalBtns.add("AVX_DARK_PHOENIX_229");
    }

    // delete start buttons
    legalBtns.delete("XMEN_START");
    legalBtns.delete("AVENGERS_START");

    setAvailableButtons(Array.from(legalBtns));
  }, [connected, completed, currentAction]);

  const checkAchievement = (
    achievementKey: keyof Achievements,
    rewardPath: string | Array<string>,
    connectedPath: string
  ) => {
    if (
      (Array.isArray(rewardPath)
        ? rewardPath.some((rp) => !connected.includes(rp))
        : !connected.includes(rewardPath)) &&
      connected.includes(connectedPath) &&
      achievements[achievementKey]
    ) {
      if (Array.isArray(rewardPath)) {
        rewardPath.forEach(addRewards);
      } else {
        addRewards(rewardPath);
      }
    }
  };

  // CHECK FOR ACHIEVEMENTS
  useEffect(() => {
    checkAchievement("win_with_inhumans", "MIST_PATH_6", "MIST_PATH_31");
    checkAchievement("thanos_defeated", "MIST_PATH_7", "MIST_GROUP_1");
    checkAchievement("win_with_new_avengers", "GALAXY_PATH_1", "GALAXY_PATH_2");
    checkAchievement(
      "win_with_midnight_sons",
      "MIDNIGHT_PATH_4",
      "MIDNIGHT_PATH_5"
    );
    checkAchievement(
      "win_with_ebony_blade",
      "MIDNIGHT_PATH_14",
      "MIDNIGHT_PATH_13"
    );
    checkAchievement(
      "win_with_dark_avengers",
      "DARKNESS_PATH_24",
      "DARKNESS_PATH_23"
    );
    checkAchievement("win_with_asgardians", "CASTLE_PATH_1", "CASTLE_PATH_2");
    checkAchievement("win_with_starjammers", "STARS_PATH_13", "STARS_PATH_15");
    checkAchievement(
      "win_with_guardians_galaxy",
      "STARS_PATH_12",
      "STARS_PATH_11"
    );
    checkAchievement("win_with_illuminati", "EXILE_PATH_8", "EXILE_PATH_25");
    checkAchievement("win_with_thunderbolts", "EXILE_PATH_14", "EXILE_PATH_10");
    checkAchievement(
      "win_with_mjolnir",
      ["CASTLE_PATH_28", "CASTLE_PATH_29"],
      "CASTLE_GROUP_3"
    );
    checkAchievement("win_with_pet", "GALAXY_PATH_12", "GALAXY_PATH_10");
  }, [connected, achievements]);

  // PUSH TO STACK
  useEffect(() => {
    // if (currentAction !== "") return;
    if (
      undoing ||
      currentAction === "resolvingRecover" ||
      currentAction === "tradingHero"
    ) {
      setUndoing(false);
      return;
    }
    const newState = JSON.stringify({
      score,
      currentAction: "",
      currentBtnClicked,
      orTagChoosingQueue: [...orTagChoosingQueue],
      tags: { ...tags },
      actionTokens: { ...actionTokens },
      heroesAvX: [...heroesAvX],
      heroesMultiverse: [...heroesMultiverse],
      heroesCrossover: [...heroesCrossover],
      heroesDead: [...heroesDead],
      cooldown: cooldown.map((cd) => cd.slice()),
      teams: [...teams],
      equipment: { ...equipment },
      pets: [...pets],
      specialRewards: { ...specialRewards },
      infinityStones: [...infinityStones],
      completed: [...completed],
      connected: [...connected],
      achievements: { ...achievements },
      modalOpen,
      availableButtons: [...availableButtons],
    });
    setStack((curr) => [...curr, newState]);
    localStorage?.setItem("save-data", newState);
  }, [
    score,
    orTagChoosingQueue,
    tags,
    actionTokens,
    heroesAvX,
    heroesMultiverse,
    heroesMultiverse,
    heroesDead,
    cooldown,
    teams,
    equipment,
    pets,
    specialRewards,
    infinityStones,
    completed,
    connected,
    achievements,
  ]);

  const hardResetThatDestroysAllData = () => {
    setScore(0);
    setCurrentAction("");
    setCurrentBtnClicked("");
    setOrTagChoosingQueue([]);
    setTags({
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
      STAR: 0,
      SPARKLE: 0,
    });
    setActionTokens({
      MOVE: 0,
      FIGHT: 0,
      HEROIC: 0,
      WILD: 0,
    });
    setHeroesAvX([]);
    setHeroesMultiverse([
      "BLACK_PANTHER_SHURI",
      "CAPTAIN_CARTER",
      "IRONHEART",
      "MIGHTY_THOR",
    ]);
    setHeroesCrossover([]);
    setHeroesDead([]);
    setCooldown([[], []]);
    setTeams([]);
    setEquipment({ GENERIC: [] });
    setPets([]);
    setMisc([]);
    setSpecialRewards({
      DANGER_ROOM: 0,
      CAMP_HAMMOND: 0,
      RECOVER: 0,
      RECOVER_F4: 0,
      TRADE: 0,
      MKRAAN_CRYSTAL: 0,
      PORTAL: 2,
    });
    setInfinityStones([]);
    setCompleted([]);
    setConnected(["JOURNEY_GROUP_1"]);
    setAchievements({
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
    });
    setModalOpen(false);
    setAvailableButtons(["XMEN_START", "AVENGERS_START"]);
    setHeroChoices([]);
    setUndoing(true);
    setChained([]);
    setToast("");
    setCollectorsBought(0);
    setRoster(new Set());
    setTeamRoster(new Set());
    setEquipRoster(new Set());
    setPetRoster(new Set());
    setUseDangerRoom(false);
    setUseCampHammond(false);
    setStack((curr) => curr.slice(0, 1));
  };

  const recruitedHeroes = heroesAvX.concat(heroesMultiverse, heroesDead);

  const undo = useCallback(
    (prev?: string) => {
      setUndoing(true);
      if (!prev) {
        const newStack = stack.slice(0, -1);
        prev = newStack[newStack.length - 1];
        if (!prev) return;
        localStorage?.setItem("save-data", prev);
        setStack(newStack);
      }
      const prevState = JSON.parse(prev);
      setScore(prevState.score);
      setCurrentAction(prevState.currentAction);
      setCurrentBtnClicked(prevState.currentBtnClicked);
      setOrTagChoosingQueue(prevState.orTagChoosingQueue);
      setTags(prevState.tags);
      setActionTokens(prevState.actionTokens);
      setHeroesAvX(prevState.heroesAvX);
      setHeroesMultiverse(prevState.heroesMultiverse);
      setHeroesCrossover(prevState.heroesCrossover);
      setHeroesDead(prevState.heroesDead);
      setCooldown(prevState.cooldown);
      setTeams(prevState.teams);
      setEquipment(prevState.equipment);
      setPets(prevState.pets);
      setSpecialRewards(prevState.specialRewards);
      setInfinityStones(prevState.infinityStones);
      setCompleted(prevState.completed);
      setConnected(prevState.connected);
      setAchievements(prevState.achievements);
    },
    [stack]
  );

  useEffect(() => {
    const saveData = localStorage?.getItem("save-data");
    if (saveData) {
      undo(saveData);
    }
  }, [undo]);

  const clearCurrentAction = () => {
    setCurrentAction("");
  };

  const addRewards = (btnKey: string) => {
    const area = getArea(btnKey);

    // points
    setScore(score + (villainInfo[btnKey]?.points || 0));
    setCompleted((curr) => [...curr, btnKey]);

    // chained heroes
    if (chained.length) {
      if (area === "AVX") {
        setHeroesAvX((curr) => [...curr, ...chained]);
      } else {
        setHeroesMultiverse((curr) => [...curr, ...chained]);
      }
    }

    // add connections and rewards
    btnToPathConnections[btnKey].forEach((path) => {
      if (connected.includes(path)) return;
      if (path === "AVX_PATH_235") {
        const newPaths = INFINITY_PATHS.slice(0, infinityStones.length);
        setConnected((curr) => [...curr, ...newPaths]);
      }

      // connection
      setConnected((curr) => [...curr, path]);

      // rewards
      const rewards = pathRewards[path];
      if (rewards === undefined) return;

      if (OR_PATHS.includes(path)) {
        setOrTagChoosingQueue([...orTagChoosingQueue, rewards as Array<Tag>]);
        setCurrentAction("choosingOrTag");
        return;
      }

      for (const reward of rewards) {
        if (isEquipKey(reward)) {
          const hero = equipmentLookup[reward];
          setEquipment((curr) => {
            const res = { ...curr };
            if (res[hero] === undefined) res[hero] = [];
            res[hero].push(reward);
            return res;
          });
        } else if (isTeamKey(reward)) {
          setTeams((curr) => [...curr, reward]);
        } else if (isPetKey(reward)) {
          setPets((curr) => [...curr, reward]);
        } else if (isActionType(reward)) {
          setActionTokens((curr) => ({
            ...curr,
            [reward]: curr[reward] + 1,
          }));
        } else if (isTag(reward)) {
          setTags((curr) => ({
            ...curr,
            [reward]: curr[reward] + 1,
          }));
          if (reward === "BOLT") {
            setAchievements((curr) => {
              const res = { ...curr };
              res.total_bolts += 1;
              return res;
            });
          }
          if (reward === "STAR") {
            setAchievements((curr) => {
              const res = { ...curr };
              res.total_stars += 1;
              return res;
            });
          }
        } else if (isSpecialReward(reward)) {
          if (reward === "CAMP_HAMMOND") {
            setSpecialRewards((curr) => {
              const res = { ...curr };
              res.CAMP_HAMMOND += 3;
              return res;
            });
          } else {
            setSpecialRewards((curr) => {
              const res = { ...curr };
              res[reward] += 1;
              return res;
            });
            if (reward === "PORTAL") {
              setAchievements((curr) => {
                const res = { ...curr };
                res.total_portals += 1;
                return res;
              });
            }
          }
        } else if (isHeroKey(reward)) {
          recruitedHeroes.push(reward);
          const updater = (curr: Array<HeroKey>) => {
            if (reward !== "DEADPOOL" && curr.includes(reward)) return curr;
            return [...curr, reward];
          };
          switch (area) {
            case "AVX":
              setHeroesAvX(updater);
              break;
            case "MULTIVERSE":
              setHeroesMultiverse(updater);
              break;
            case "DC":
              console.error(`Hero ${reward} seems to be from DC United.`);
              break;
          }
        } else if (isMiscKey(reward)) {
          setMisc([...misc, reward]);
        } else {
          console.error(`Reward: ${reward} did not have a matching type.`);
        }
      }
    });

    // INFINITY STONES
    const stone = villainInfo[btnKey]?.infinity;
    if (stone) {
      setInfinityStones(infinityStones.concat(stone));
    }

    // CHECK BOTH HERO ACHIEVEMENTS
    if (
      !achievements.unlock_colossus_and_kitty &&
      recruitedHeroes.includes("COLOSSUS") &&
      recruitedHeroes.includes("KITTY_PRYDE")
    ) {
      setAchievements((curr) => ({ ...curr, unlock_colossus_and_kitty: true }));
      setActionTokens((curr) => ({ ...curr, HEROIC: curr.HEROIC + 1 }));
    }

    if (
      !achievements.unlock_jessica_and_luke &&
      recruitedHeroes.includes("JESSICA_JONES") &&
      recruitedHeroes.includes("LUKE_CAGE")
    ) {
      setAchievements((curr) => ({ ...curr, unlock_jessica_and_luke: true }));
      setActionTokens((curr) => ({ ...curr, HEROIC: curr.HEROIC + 1 }));
    }

    if (
      !achievements.unlock_rogue_and_gambit &&
      recruitedHeroes.includes("ROGUE") &&
      recruitedHeroes.includes("GAMBIT")
    ) {
      setAchievements((curr) => ({ ...curr, unlock_rogue_and_gambit: true }));
      setActionTokens((curr) => ({ ...curr, HEROIC: curr.HEROIC + 1 }));
    }

    if (
      !achievements.unlock_chod_corsair_hepzibah_raza &&
      recruitedHeroes.includes("CHOD") &&
      recruitedHeroes.includes("CORSAIR") &&
      recruitedHeroes.includes("HEPZIBAH") &&
      recruitedHeroes.includes("RAZA")
    ) {
      setAchievements((curr) => ({
        ...curr,
        unlock_chod_corsair_hepzibah_raza: true,
      }));
    }
  };

  const canPayCost = (btn: string) => {
    const { cost } = combinedButtons[btn];
    if (cost === undefined) return true;
    const testResources = { ...tags };

    Object.entries(cost).forEach(
      ([tag, qtx]) => (testResources[tag as Tag] -= qtx)
    );

    if (Object.values(testResources).some((v) => v < 0)) return false;

    if (
      COLLECTOR_BTNS.includes(btn) &&
      testResources.KEY < COLLECTOR_COSTS[collectorsBought]
    ) {
      return false;
    }

    return true;
  };

  const updateCooldown = (newHeroes: typeof roster) => {
    setCooldown((curr) => {
      return [[...curr[1]], [...newHeroes]];
    });
  };

  const btnClickHandler = (key: string, moved: boolean): MouseEventHandler => {
    return (e) => {
      e.stopPropagation();
      if (moved) return;

      setCurrentBtnClicked(key);

      // Handle starting key exception
      if (key === "XMEN_START" || key === "AVENGERS_START") {
        const newConnections = btnToPathConnections[key];
        setCompleted((curr) => [...curr, key]);
        setConnected((curr) => [...curr, ...newConnections]);
        const newHeroes: Array<HeroKey> = [];
        for (const nc of newConnections) {
          pathRewards[nc].forEach((reward) =>
            newHeroes.push(reward as HeroKey)
          );
        }
        setHeroesAvX((curr) => [...curr, ...newHeroes]);
        return;
      }

      const { cost } = combinedButtons[key];

      if (cost) {
        // gate
        for (const [key, qtx] of Object.entries(cost)) {
          const tagKey = key as Tag;
          setTags((curr) => ({
            ...curr,
            [tagKey]: curr[tagKey] - qtx,
          }));
        }
        addRewards(key);
      } else if (COLLECTOR_BTNS.includes(key)) {
        setTags((curr) => ({
          ...curr,
          KEY: curr.KEY - COLLECTOR_COSTS[collectorsBought],
        }));
        setCollectorsBought(collectorsBought + 1);
        addRewards(key);
      } else if (REMOVE_BTNS.includes(key)) {
        setCurrentAction("removingHero");
        setToast("Choose a hero to remove.");
      } else if (key === "AVX_TRADE_243") {
        // TRADE
        setCompleted((curr) => [...curr, "AVX_TRADE_243"]);
        setCurrentAction("tradingHero");
        setToast("Choose a hero to remove.");
      } else {
        // villain
        setCurrentAction("resolvingFight");
        startFight(key);
      }
    };
  };

  const unearnedPaths = () => {
    const combinedRewards: Array<string> = [
      ...heroesAvX,
      ...heroesMultiverse,
      ...heroesCrossover,
      ...Object.values(equipment).flat(),
      ...teams,
      ...pets,
      ...misc,
    ];

    return Object.entries(combinedOverlays)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([key, _]) => !combinedRewards.includes(key))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, d]) => d);
  };

  const toggleModalOpen = (b?: boolean) => {
    setModalOpen(b === undefined ? !modalOpen : b);
  };

  const canRecover = (h: HeroKey) => {
    if (currentAction === "resolvingRecover") return true;
    if (currentAction === "resolvingRecoverF4" && isFantasticHero(h)) {
      return true;
    }
    return false;
  };

  const spendButtonClickHandler =
    (action: CurrentAction): MouseEventHandler =>
    () => {
      setCurrentAction(currentAction === action ? "" : action);
    };

  const modifyTag = (t: Tag, qtx: number) => {
    setTags((curr) => ({
      ...curr,
      [t]: curr[t] + qtx,
    }));
  };

  const modifyAction = (a: ActionType, qtx: number) => {
    setActionTokens((curr) => ({
      ...curr,
      [a]: curr[a] + qtx,
    }));
  };

  const completeAchievement = (a: keyof Achievements) => {
    setAchievements((curr) => ({
      ...curr,
      [a]: true,
    }));
  };

  const tagClickHandler = (t: Tag): MouseEventHandler | undefined => {
    switch (currentAction) {
      case "choosingOrTag":
        if (
          orTagChoosingQueue.length === 0 ||
          orTagChoosingQueue[0].includes(t)
        )
          return;
        return () => {
          modifyTag(t, 1);
          setOrTagChoosingQueue(orTagChoosingQueue.slice(1));
          if (
            currentAction === "choosingOrTag" &&
            orTagChoosingQueue.length === 0
          ) {
            setCurrentAction("");
          }
        };
      default:
        return;
    }
  };

  const unlockedHeroesClickHandler = (
    h: HeroKey
  ): MouseEventHandler | undefined => {
    switch (currentAction) {
      case "tradingHero":
      case "removingHero":
        return () => {
          killHero(h);
          setCooldown((cd) => {
            const res: [Array<HeroKey>, Array<HeroKey>] = [
              cd[0].slice(),
              cd[1].slice(),
            ];
            const idxA = res.findIndex((c) => c.includes(h));
            if (idxA === -1) return res;
            const idxB = res[idxA].indexOf(h);
            res[idxA].splice(idxB, 1);
            return res;
          });
          if (currentAction === "removingHero") {
            setCurrentAction("");
            setToast("");
            addRewards(currentBtnClicked);
          } else {
            setCurrentAction("resolvingRecover");
            setToast("Choose a hero to recover.");
          }
        };
      case "spendingPortal":
        if (heroesCrossover.includes(h)) {
          return;
        }
        return () => {
          setHeroesCrossover([...heroesCrossover, h]);
          setCurrentAction("");
          setSpecialRewards((curr) => {
            const res = { ...curr };
            --res.PORTAL;
            return res;
          });
        };
      default:
        return;
    }
  };

  const handleMagnetoX1 = () => {
    if (roster.has("MAGNETO_X1")) {
      setHeroesAvX((curr) => {
        const res = curr.slice();
        res.splice(res.indexOf("MAGNETO_X1"), 1);
        return res;
      });
      setRoster((curr) => {
        const res = new Set(curr);
        res.delete("MAGNETO_X1");
        return res;
      });
    }
  };

  const won = () => {
    handleMagnetoX1();
    updateCooldown(roster);
    addRewards(currentBtnClicked);

    // HERO ACHIEVEMENTS
    if (!achievements.win_with_beast && roster.has("BEAST")) {
      completeAchievement("win_with_beast");
      modifyTag("KEY", 1);
    }
    if (!achievements.win_with_iceman && roster.has("ICEMAN")) {
      completeAchievement("win_with_iceman");
      modifyAction("MOVE", 1);
    }
    if (!achievements.win_with_jean && roster.has("JEAN_GREY")) {
      completeAchievement("win_with_jean");
      modifyTag("BRAIN", 1);
    }
    if (!achievements.win_with_cyclops && roster.has("CYCLOPS")) {
      completeAchievement("win_with_cyclops");
      modifyTag("KEY", 1);
    }
    if (!achievements.win_with_forge && roster.has("FORGE")) {
      completeAchievement("win_with_forge");
      modifyTag("GEAR", 1);
    }
    if (!achievements.win_with_storm && roster.has("STORM")) {
      completeAchievement("win_with_storm");
      modifyAction("MOVE", 1);
    }
    if (!achievements.win_with_miles && roster.has("MILES_MORALES")) {
      completeAchievement("win_with_miles");
      modifyTag("GEAR", 1);
    }
    if (!achievements.win_with_iron_man && roster.has("IRON_MAN")) {
      completeAchievement("win_with_iron_man");
      modifyTag("KEY", 1);
    }
    if (!achievements.win_with_hulk && roster.has("HULK")) {
      completeAchievement("win_with_hulk");
      modifyAction("FIGHT", 1);
    }
    if (!achievements.win_with_cap && roster.has("CAPTAIN_AMERICA")) {
      completeAchievement("win_with_cap");
      modifyTag("GEAR", 1);
    }
    if (!achievements.win_with_widow && roster.has("BLACK_WIDOW")) {
      completeAchievement("win_with_widow");
      modifyTag("BRAIN", 1);
    }
    if (!achievements.win_with_wanda && roster.has("SCARLET_WITCH")) {
      completeAchievement("win_with_wanda");
      modifyTag("MAGIC", 1);
    }
    if (!achievements.win_with_black_panther && roster.has("BLACK_PANTHER")) {
      completeAchievement("win_with_black_panther");
      modifyTag("GEAR", 1);
    }
    if (!achievements.win_with_starlord && roster.has("STAR_LORD")) {
      completeAchievement("win_with_starlord");
      modifyTag("KEY", 1);
    }
    if (!achievements.win_with_antman && roster.has("ANT_MAN")) {
      completeAchievement("win_with_antman");
      modifyTag("GEAR", 1);
    }
    if (!achievements.win_with_wasp && roster.has("WASP")) {
      completeAchievement("win_with_wasp");
      modifyTag("BRAIN", 1);
    }
    if (!achievements.win_with_moon_knight && roster.has("MOON_KNIGHT")) {
      completeAchievement("win_with_moon_knight");
      modifyTag("MAGIC", 1);
    }
    if (!achievements.win_with_guardian && roster.has("GUARDIAN")) {
      completeAchievement("win_with_guardian");
      modifyTag("MAPLE", 1);
    }
    if (!achievements.win_with_puck && roster.has("PUCK")) {
      completeAchievement("win_with_puck");
      modifyTag("MAPLE", 1);
    }
    if (!achievements.win_with_sasquatch && roster.has("SASQUATCH")) {
      completeAchievement("win_with_sasquatch");
      modifyTag("MAPLE", 1);
    }
    if (!achievements.win_with_snowbird && roster.has("SNOWBIRD")) {
      completeAchievement("win_with_snowbird");
      modifyTag("MAPLE", 1);
    }
    if (!achievements.win_with_northstar && roster.has("NORTHSTAR")) {
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

    endFight();
  };

  const killHero = (h: HeroKey) => {
    if (chained.includes(h)) return;
    const area = heroAreaLookup[h];

    if (area === "AVX") {
      setHeroesAvX(REMOVE_HERO(h));
    } else {
      setHeroesMultiverse(REMOVE_HERO(h));
    }

    setHeroesDead((curr) => [...curr, h]);

    if (!achievements.war_machine_removed && h === "WAR_MACHINE") {
      completeAchievement("war_machine_removed");
      modifyTag("GEAR", 1);
    }

    if (!achievements.vision_removed && h === "VISION") {
      completeAchievement("vision_removed");
      modifyTag("GEAR", 1);
    }
  };

  const recoverHero = (h: HeroKey) => {
    const area = heroAreaLookup[h];

    setHeroesDead(REMOVE_HERO(h));
    if (area === "AVX") {
      setHeroesAvX([...heroesAvX, h]);
    } else {
      setHeroesMultiverse([...heroesMultiverse, h]);
    }

    setCurrentAction("");
    setToast("");
  };

  const lost = () => {
    handleMagnetoX1();
    roster.forEach(killHero);
    updateCooldown(new Set());
    endFight();
  };

  const resolveDeadpool = (score: number) => {
    if (
      (connected.includes("AVX_PATH_142") && score < 30) ||
      (connected.includes("AVX_PATH_141") && score < 20) ||
      (connected.includes("AVX_PATH_140") && score < 10) ||
      score < 5
    ) {
      // FAILED
      setToast("Choose a hero to lose in the Deadpool fight.");
      setCurrentAction("choosingDeadpoolVictim");
      setChained([]);
      setHeroChoices([...roster]);
      setRoster(new Set());
    } else {
      // SUCCESS
      updateCooldown(roster);
      if (score >= 30) {
        setCompleted((curr) => [...curr, "AVX_DEADPOOL_6969"]);
        addRewards("AVX_DEADPOOL_D");
      } else if (score >= 20) {
        addRewards("AVX_DEADPOOL_C");
      } else if (score >= 10) {
        addRewards("AVX_DEADPOOL_B");
      } else {
        addRewards("AVX_DEADPOOL_A");
      }
      endFight();
    }
  };

  const resolveDeadpoolVictim = () => {
    const cooldownHeroes = new Set(heroChoices);
    const deadHero = roster.keys().next().value as HeroKey;
    cooldownHeroes.delete(deadHero);
    killHero(deadHero);
    updateCooldown(cooldownHeroes);
    setToast("");
    setCurrentAction("");
    endFight();
  };

  const startFight = (btn: string) => {
    setModalOpen(true);
    if (btn === "AVX_DEADPOOL_6969") {
      setCurrentAction("fightingDeadpool");
    }

    const area = getArea(btn);
    const newHeroChoices = getHeroesCrossover().slice();
    if (area === "AVX") {
      newHeroChoices.push(...getHeroesAvX());
    } else {
      newHeroChoices.push(...getHeroesMultiverse());
    }

    setHeroChoices(
      newHeroChoices.filter((hero) => !cooldown.flat().includes(hero))
    );

    if (btn in chainedHeroes) {
      setChained(chainedHeroes[btn]);
      setRoster(new Set(chainedHeroes[btn]));
    } else {
      setRoster(new Set());
    }
  };

  const toggleRosterHero = (h: HeroKey) => () => {
    if (currentAction === "choosingDeadpoolVictim") {
      let newRoster = new Set([h]);
      if (roster.has(h)) {
        newRoster = new Set(roster);
        newRoster.delete(h);
      }
      setRoster(newRoster);
      return;
    }
    if (chained.includes(h)) return;
    setRoster((curr) => {
      const res = new Set(curr);
      if (res.has(h)) {
        res.delete(h);
      } else {
        res.add(h);
      }
      return res;
    });
  };

  const endFight = () => {
    setModalOpen(false);
    setTimeout(() => {
      setRoster(new Set());
      setTeamRoster(new Set());
      setPetRoster(new Set());
      setEquipRoster(new Set());
      setChained([]);
      setActionTokens((curr) => {
        const res = { ...curr };
        res.MOVE -= spentActionTokens.MOVE;
        res.FIGHT -= spentActionTokens.FIGHT;
        res.HEROIC -= spentActionTokens.HEROIC;
        res.WILD -= spentActionTokens.WILD;
        return res;
      });
      setSpentActionTokens({
        MOVE: 0,
        FIGHT: 0,
        HEROIC: 0,
        WILD: 0,
      });
      if (useCampHammond) {
        setUseCampHammond(false);
        setSpecialRewards((curr) => {
          const res = { ...curr };
          --res.CAMP_HAMMOND;
          return res;
        });
      }
      if (useDangerRoom) {
        setUseDangerRoom(false);
        setSpecialRewards((curr) => {
          const res = { ...curr };
          --res.DANGER_ROOM;
          return res;
        });
      }
      if (
        currentAction === "resolvingFight" ||
        currentAction === "fightingDeadpool"
      ) {
        setCurrentAction("");
      }
    }, 100);
  };

  const isHeroClickable = (h: HeroKey): boolean => {
    if (currentAction === "choosingDeadpoolVictim") {
      return true;
    }
    if (roster.has(h)) {
      return true;
    }
    if (roster.size < 4) {
      return true;
    }

    return false;
  };

  const getHeroesAvX = () => {
    return heroesAvX.filter(
      (h) => !(heroesCrossover.includes(h) || heroesDead.includes(h))
    );
  };

  const getHeroesMultiverse = () => {
    return heroesMultiverse.filter(
      (h) => !(heroesCrossover.includes(h) || heroesDead.includes(h))
    );
  };

  const getHeroesCrossover = () => {
    return heroesCrossover.filter((h) => !heroesDead.includes(h));
  };

  // USER SELECTION STUFF
  useEffect(() => {
    if (teamRoster.size) {
      const team = teamRoster.keys().next().value as TeamKey;
      roster.forEach((h) => {
        if (!teamToHeroLookup[team].includes(h)) {
          setTeamRoster(new Set());
        }
      });
    }
  }, [roster, teamRoster]);

  const generateTeamChoiceListProps = (): ChoiceSelectorProps<TeamKey> => {
    return {
      title: "Teams",
      subtitle: teamRoster.size
        ? translations[teamRoster.keys().next().value as TeamKey]
        : "",
      data: teams,
      srcs: teamIconSrcs,
      selection: teamRoster,
      itemClickHandler: (t) => {
        setTeamRoster(new Set([t]));
      },
      itemClickable: (t) => {
        return (
          t === teamRoster.keys().next().value ||
          [...roster].every((h) => teamToHeroLookup[t].includes(h))
        );
      },
      titleGenerator: (t) => {
        const heroes: Array<string> = heroChoices
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
          [...roster]
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
      data: Object.values(pets).flat(),
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

  useEffect(() => {
    if (isTooManyPets()) {
      setToast("You have more pets than heroes!");
    } else {
      setToast("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roster, petRoster]);

  const isTooManyPets = () => {
    return petRoster.size > roster.size;
  };

  const resetClickHandler = () => {
    if (currentAction === "reset1") {
      setCurrentAction("reset2");
    } else if (currentAction === "reset2") {
      hardResetThatDestroysAllData();
    } else {
      setCurrentAction("reset1");
    }
  };

  const toggleCampHammond = () => setUseCampHammond(!useCampHammond);
  const toggleDangerRoom = () => setUseDangerRoom(!useDangerRoom);

  const modifyActionTokens = (a: ActionType, qtx: number) => {
    setSpentActionTokens((curr) => {
      const res = { ...curr };
      res[a] += qtx;
      if (res[a] < 0) return curr;
      return res;
    });
  };

  return {
    achievements,
    actionTokens,
    availableButtons,
    blocked: currentAction !== "",
    btnClickHandler,
    canRecover,
    chained,
    clearCurrentAction,
    completed,
    connected,
    cooldown,
    currentAction,
    currentBtnClicked,
    endFight,
    equipment,
    equipRoster,
    generateEquipChoiceListProps,
    generatePetChoiceListProps,
    generateTeamChoiceListProps,
    getArea,
    getHeroesAvX,
    getHeroesCrossover,
    getHeroesMultiverse,
    heroChoices,
    heroesDead,
    infinityStones,
    isHeroClickable,
    isTooManyPets,
    lost,
    modalOpen,
    modifyActionTokens,
    petRoster,
    recoverHero,
    recruitedHeroes,
    resetClickHandler,
    resolveDeadpool,
    resolveDeadpoolVictim,
    roster,
    score,
    specialRewards,
    spendButtonClickHandler,
    spentActionTokens,
    tagClickHandler,
    tags,
    teamRoster,
    toast,
    toggleCampHammond,
    toggleDangerRoom,
    toggleModalOpen,
    toggleRosterHero,
    undo,
    undoDisabled: stack.length < 2,
    unearnedPaths,
    unlockedHeroesClickHandler,
    useCampHammond,
    useDangerRoom,
    won,
  };
};
