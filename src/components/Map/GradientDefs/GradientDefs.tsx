import { FC } from "react";
import { combinedGradients } from "../../../lib/svg-info";
import { PATH_COLOR } from "../../../lib/constants";

interface GradientDefsProps {}

const GradientDefs: FC<GradientDefsProps> = () => {
  return (
    <defs>
      {combinedGradients.map((gradient, i) => (
        <linearGradient key={i} {...gradient}>
          {gradient.stops.map((stop, i) => (
            <stop key={i} {...stop} stopColor={PATH_COLOR} />
          ))}
        </linearGradient>
      ))}
    </defs>
  );
};

export default GradientDefs;
