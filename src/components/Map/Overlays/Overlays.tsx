import { FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";

const Overlays: FC = () => {
  const { unearnedPaths } = useContext(statusContext);

  return unearnedPaths().map((d, i) => (
    <path key={i} d={d} style={{ mixBlendMode: "saturation" }} />
  ));
};

export default Overlays;
