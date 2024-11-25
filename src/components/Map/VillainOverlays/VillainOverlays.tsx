import { FC, Fragment, useContext } from "react";
import styles from "./VillainOverlays.module.scss";
import { statusContext } from "../../../StatusContext";

const VillainOverlays: FC = () => {
  const { getVillainOverlaySVGPathStrings } = useContext(statusContext);

  return getVillainOverlaySVGPathStrings().map(
    ({ overlay, checkmark, slash }, i) => {
      return (
        <Fragment key={i}>
          <path d={overlay} style={{ mixBlendMode: "saturation" }} />
          <path d={checkmark} className={styles.checkmark} />
          <path d={slash} className={styles.slash} />
        </Fragment>
      );
    }
  );
};

export default VillainOverlays;
