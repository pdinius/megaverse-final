import { FC, useContext } from "react";
import { statusContext } from "../../../StatusContext";
import { combinedOverlays } from "../../../lib/svg-info";
import { villainInfo } from "../../../lib/villain-info";

interface MaskProps {}

const Mask: FC<MaskProps> = () => {
  const { overlay } = useContext(statusContext);

  if (overlay === null) return null;

  const paths: Array<string> = [];
  if (overlay in combinedOverlays) paths.push(combinedOverlays[overlay]);
  if (overlay === "SILVER_SURFER") {
    paths.push(combinedOverlays.SILVER_SURFER_2);
  }
  if (overlay === "SCARLET_WITCH") {
    paths.push(combinedOverlays.SCARLET_WITCH_2);
  }
  if (overlay === "QUICKSILVER") {
    paths.push(combinedOverlays.QUICKSILVER);
  }
  if (overlay === "BOB_AGENT_OF_HYDRA") {
    paths.push(combinedOverlays.BOB_AGENT_OF_HYDRA_2);
  }
  if (overlay === "DEADPOOL") {
    paths.push(combinedOverlays.DEADPOOL_2);
  }

  Object.values(villainInfo)
    .filter((v) => v.key === overlay)
    .forEach((v) => {
      paths.push(v.overlay);
    });

  if (paths.length === 0) {
    console.log(overlay);
  }

  return overlay ? (
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
  ) : null;
};

export default Mask;
