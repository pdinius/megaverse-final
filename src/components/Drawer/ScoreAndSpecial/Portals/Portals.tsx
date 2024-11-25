import { FC, useContext } from "react";
import styles from "./Portals.module.scss";
import portal from "../../../../assets/icons/portal.png";
import upperStyles from "../ScoreAndSpecial.module.scss";
import { statusContext } from "../../../../StatusContext";
import PortalButton from "../../Button/PortalButton";

const Portals: FC = () => {
  const { specialRewards } = useContext(statusContext);

  return (
    <div
      className={upperStyles.item}
      style={{ marginLeft: "-0.35rem" }}
      title="Portals"
    >
      <img src={portal} className={styles.portal} />
      <span className={styles.portalText}>{specialRewards.PORTAL}</span>
      <PortalButton />
    </div>
  );
};

export default Portals;
