import { FC, useState } from "react";
import DraggablePannableSvg from "../DraggablePannableSvg/DraggablePannableSvg";
import map from "../../assets/map.jpg";
import Achievements from "./Achievements/Achievements";
import InfinityStones from "./InfinityStones/InfinityStones";
import GradientDefs from "./GradientDefs/GradientDefs";
import Overlays from "./Overlays/Overlays";
import VillainOverlays from "./VillainOverlays/VillainOverlays";
import Paths from "./Paths/Paths";
import Buttons from "./Buttons/Buttons";
import MkraanCrystalProgress from "./MkraanCrystalProgress/MkraanCrystalProgress";

export const Map: FC = () => {
  const [moved, setMoved] = useState(false);

  return (
    <DraggablePannableSvg width={8247} height={7649} setMoved={setMoved}>
      <image href={map} />
      <GradientDefs />
      <MkraanCrystalProgress />
      <Overlays />
      <VillainOverlays />
      <Paths />
      <Achievements />
      <Buttons moved={moved} />
      <InfinityStones />
    </DraggablePannableSvg>
  );
};
