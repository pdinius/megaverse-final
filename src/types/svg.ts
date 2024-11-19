import { SVGProps } from "react";
import { Tag } from "./general";
import { HeroKey } from "./heroes";
import { TeamKey } from "./teams";
import { EquipKey } from "./equipment";
import { PetKey } from "./pets";
import { MiscKey } from "./misc";
import { CompanionKey } from "./companions";

export type GradientWithStops = SVGProps<SVGLinearGradientElement> & {
  stops: Array<SVGProps<SVGStopElement>>;
};

export type Path = { d: string; fill?: string };

export type SvgProps = {
  paths: { [key: string]: Path | Array<Path> };
  buttons: {
    [key: string]: {
      d: string;
      cost?: { [key in Tag]?: number };
    };
  };
  overlays: {
    [key in
      | HeroKey
      | TeamKey
      | EquipKey
      | PetKey
      | CompanionKey
      | MiscKey]?: string;
  };
  gradients: Array<GradientWithStops>;
};
