import { FC, useContext } from "react";
import styles from "./Portals.module.scss";
import SpendButton from "../../Button/SpendButton";
import portal from "../../../../assets/icons/portal.png";
import upperStyles from "../ScoreAndSpecial.module.scss";
import { statusContext } from "../../../../StatusContext";

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
      <SpendButton
        disabled={specialRewards.PORTAL === 0}
        actionName="spendingPortal"
      />
    </div>
  );
};

export default Portals;
