import { Tag } from "../types/general";
import BOLT from "../assets/icons/bolt.png";
import BRAIN from "../assets/icons/brain.png";
import CHIMI from "../assets/icons/chimi.png";
import CHOICE from "../assets/icons/choice.png";
import DNA from "../assets/icons/dna.png";
import EYE from "../assets/icons/eye.png";
import FLAG from "../assets/icons/flag.png";
import GEAR from "../assets/icons/gear.png";
import HOURGLASS from "../assets/icons/hourglass.png";
import KEY from "../assets/icons/key.png";
import MAGIC from "../assets/icons/magic.png";
import MAPLE from "../assets/icons/maple.png";
import PLANET from "../assets/icons/planet.png";
import PUZZLE from "../assets/icons/puzzle.png";
import SPARKLE from "../assets/icons/sparkle.png";
import STAR from "../assets/icons/star.png";
import RECOVER from "../assets/icons/recover-alt.png";
import RECOVER_F4 from "../assets/icons/recover-f4-alt.png";

export const resourceSrcs: { [key in Tag | "RECOVER" | "RECOVER_F4"]: string } =
  {
    BOLT: BOLT,
    BRAIN: BRAIN,
    CHIMI: CHIMI,
    CHOICE: CHOICE,
    DNA: DNA,
    EYE: EYE,
    FLAG: FLAG,
    GEAR: GEAR,
    HOURGLASS: HOURGLASS,
    KEY: KEY,
    MAGIC: MAGIC,
    MAPLE: MAPLE,
    PLANET: PLANET,
    PUZZLE: PUZZLE,
    SPARKLE: SPARKLE,
    STAR: STAR,
    RECOVER: RECOVER,
    RECOVER_F4: RECOVER_F4,
  };
