import { FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";

const Overlays: FC = () => {
  const { getUnearnedRewardOverlaySVGPathStrings } = useContext(statusContext);

  return getUnearnedRewardOverlaySVGPathStrings().map((d, i) => (
    <path key={i} d={d} style={{ mixBlendMode: "saturation" }} />
  ));
};

export default Overlays;
