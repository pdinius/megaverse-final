import { Challenge } from "./villain-info";
import carnage from "../assets/challenge-cards/carnage.png";
import complications from "../assets/challenge-cards/complications.png";
import endangeredLocations from "../assets/challenge-cards/endangered-locations.png";
import finFangFoom from "../assets/challenge-cards/fin-fang-foom.png";
import hard from "../assets/challenge-cards/hard.png";
import hazardousLocations from "../assets/challenge-cards/hazardous-locations.png";
import moderate from "../assets/challenge-cards/moderate.png";
import planB from "../assets/challenge-cards/plan-b.png";
import secretIdentity from "../assets/challenge-cards/secret-identity.png";
import sentinelI from "../assets/challenge-cards/sentinel-i.png";
import sentinelII from "../assets/challenge-cards/sentinel-ii.png";
import sentinelIII from "../assets/challenge-cards/sentinel-iii.png";
import takeover from "../assets/challenge-cards/takeover.png";
import titania from "../assets/challenge-cards/titania.png";
import winterGuard from "../assets/challenge-cards/winter-guard.png";

export const challengeSrcs: { [key in Challenge]: string } = {
  carnage,
  complications,
  endangeredLocations,
  finFangFoom,
  hard,
  hazardousLocations,
  infinityGauntlet: "",
  moderate,
  modularHeralds: "",
  noEquipment: "",
  planB,
  random: "",
  secondBroodQueen: "",
  secretIdentity,
  sentinelI,
  sentinelII,
  sentinelIII,
  shapeshifter: "",
  startWithMove: "",
  startWithTwoMove: "",
  takeover,
  titania,
  winterGuard,
};
