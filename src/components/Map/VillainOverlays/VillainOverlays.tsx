import { FC, Fragment, useContext } from "react";
import styles from "./VillainOverlays.module.scss";
import { statusContext } from "../../../StatusContext";
import { villainInfo } from "../../../lib/villain-info";

interface VillainOverlaysProps {}

const VillainOverlays: FC<VillainOverlaysProps> = () => {
  const { completed } = useContext(statusContext);

  return completed.map((btnKey, i) => {
    if (villainInfo[btnKey] === undefined) return null;
    const { checkmark, overlay, slash } = villainInfo[btnKey];

    return (
      <Fragment key={i}>
        <path d={overlay} style={{ mixBlendMode: "saturation" }} />
        <path d={checkmark} className={styles.checkmark} />
        <path d={slash} className={styles.slash} />
      </Fragment>
    );
  });
};

export default VillainOverlays;
