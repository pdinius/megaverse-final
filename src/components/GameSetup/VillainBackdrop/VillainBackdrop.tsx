import { FC, useContext } from "react";
import styles from "./VillainBackdrop.module.scss";
import { statusContext } from "../../../StatusContext";
import { villainInfo } from "../../../lib/villain-info";
import { villainImages } from "../../../lib/villain-images";

export const VillainBackdrop: FC = () => {
  const { currentBtnClicked } = useContext(statusContext);
  const villainKey = villainInfo[currentBtnClicked].key;
  
  return villainKey ? (
    <img
      src={villainImages[villainKey]}
      className={styles.villain}
    />
  ) : null;
};
