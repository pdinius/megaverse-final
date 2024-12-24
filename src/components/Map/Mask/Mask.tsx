import { FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";
import { combinedOverlays } from "../../../lib/svg-info";
import { villainInfo } from "../../../lib/villain-info";

interface MaskProps {}

const Mask: FC<MaskProps> = () => {
  const { overlays } = useContext(statusContext);

  if (overlays === null) return null;

  const paths: Array<string> = overlays.map((o) => combinedOverlays[o]);

  Object.values(villainInfo)
    .filter((v) => overlays.includes(v.key))
    .forEach((v) => {
      paths.push(v.overlay);
    });

  if (paths.length === 0) {
    console.log(overlays);
  }

  return (
    <>
      <defs>
        <mask id="maskmask">
          <rect width="100%" height="100%" fill="white" />
          {paths.map((p, i) => (
            <path key={i} d={p} fill="black" />
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
