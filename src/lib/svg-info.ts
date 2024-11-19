import { abyssSvgs } from "../assets/svg/abyss";
import { avxSvgs } from "../assets/svg/avx";
import { castleSvgs } from "../assets/svg/castle";
import { chariotSvgs } from "../assets/svg/chariot";
import { darknessSvgs } from "../assets/svg/darkness";
import { exileSvgs } from "../assets/svg/exile";
import { fearSvgs } from "../assets/svg/fear";
import { finalitySvgs } from "../assets/svg/finality";
import { flameSvgs } from "../assets/svg/flame";
import { foolSvgs } from "../assets/svg/fool";
import { galaxySvgs } from "../assets/svg/galaxy";
import { journeySvgs } from "../assets/svg/journey";
import { midnightSvgs } from "../assets/svg/midnight";
import { mistSvgs } from "../assets/svg/mist";
import { shieldSvgs } from "../assets/svg/shield";
import { starsSvgs } from "../assets/svg/stars";
import { warSvgs } from "../assets/svg/war";
import { Tag } from "../types/general";
import { GradientWithStops, Path, SvgProps } from "../types/svg";

const svgProps: Array<SvgProps> = [
  abyssSvgs,
  avxSvgs,
  castleSvgs,
  chariotSvgs,
  darknessSvgs,
  exileSvgs,
  fearSvgs,
  finalitySvgs,
  flameSvgs,
  foolSvgs,
  galaxySvgs,
  journeySvgs,
  midnightSvgs,
  mistSvgs,
  shieldSvgs,
  starsSvgs,
  warSvgs,
];

export const combinedGradients: GradientWithStops[] = svgProps.reduce(
  (a: Array<GradientWithStops>, b) => [...a, ...b.gradients],
  []
);

export const combinedPaths = svgProps.reduce(
  (
    a: {
      [key: string]: Path | Array<Path>;
    },
    b
  ) => ({ ...a, ...b.paths }),
  {}
);

export const combinedOverlays = svgProps.reduce(
  (
    a: {
      [key: string]: string;
    },
    b
  ) => ({ ...a, ...b.overlays }),
  {}
);

export const combinedButtons = svgProps.reduce(
  (
    a: {
      [key: string]: {
        d: string;
        cost?: { [key in Tag]?: number };
      };
    },
    b
  ) => ({ ...a, ...b.buttons }),
  {}
);
