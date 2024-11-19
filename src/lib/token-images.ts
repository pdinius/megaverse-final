import MOVE from "../assets/icons/move-icon.png";
import FIGHT from "../assets/icons/fight-icon.png";
import HEROIC from "../assets/icons/heroic-icon.png";
import WILD from "../assets/icons/wild-icon.png";
import { ActionType } from "../types/general";

export const TOKEN_SRCS: { [key in ActionType]: string } = {
  MOVE: MOVE,
  FIGHT: FIGHT,
  HEROIC: HEROIC,
  WILD: WILD,
};
