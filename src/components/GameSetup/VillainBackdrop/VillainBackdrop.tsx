import { FC, useContext } from "react";
import styles from "./VillainBackdrop.module.scss";
import { statusContext } from "../../../StatusContext";
import { villainImages } from "../../../lib/villain-images";

export const VillainBackdrop: FC = () => {
  const { getCurrentVillain } = useContext(statusContext);
  const villain = getCurrentVillain();

  return (
    villain && <img src={villainImages[villain]} className={styles.villain} />
  );
};
