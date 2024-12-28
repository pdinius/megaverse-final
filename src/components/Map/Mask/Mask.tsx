import { FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";
import { combinedOverlays } from "../../../lib/svg-info";
import { villainInfo } from "../../../lib/villain-info";
import { resourceOverlays } from "./resourceOverlays";
import { MAP_ITEMS } from "../../../types/game-status";
import { ACTION_TYPES, INFINITY_GEMS } from "../../../types/general";

const Mask: FC = () => {
  const { overlays } = useContext(statusContext);

  if (overlays === null) return null;

  const paths = overlays.reduce((a: Array<[string, string]>, b) => {
    a.push([b, combinedOverlays[b]]);
    return a;
  }, []);

  Object.values(villainInfo)
    .filter((v) => overlays.includes(v.key))
    .forEach((v) => {
      paths.push([v.key, v.overlay]);
    });

  MAP_ITEMS.filter((v) => overlays.includes(v)).forEach((v) => {
    paths.push([v, resourceOverlays[v]]);
  });

  if (overlays.includes("INFINITY_GEMS")) {
    INFINITY_GEMS.forEach((v) => {
      paths.push([v, resourceOverlays[v]]);
    });
  }
  if (overlays.includes("ACTION_TOKENS")) {
    ACTION_TYPES.forEach((v) => {
      paths.push([v, resourceOverlays[v]]);
    });
  }

  return (
    <>
      <defs>
        <mask id="maskmask">
          <rect width="100%" height="100%" fill="white" />
          {paths.map((p, i) => (
            <path
              key={i}
              id={`mask_${p[0]}`}
              d={p[1]}
              fill="black"
              filter={p[0] === "PORTAL" ? "blur(15)" : undefined}
            />
          ))}
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="rgb(0 0 0 / 0.85)"
        mask="url(#maskmask)"
      />
    </>
  );
};

export default Mask;
