import { combinedButtons } from "../../../lib/svg-info";
import { villainInfo } from "../../../lib/villain-info";
import { statusContext } from "../../../StatusContext";
import styles from "./Buttons.module.scss";
import { FC, useContext } from "react";

interface ButtonsProps {
  moved: boolean;
}

const Buttons: FC<ButtonsProps> = ({ moved }) => {
  const { availableButtons, btnClickHandler } = useContext(statusContext);

  return availableButtons.map((key, i) => (
    <path
      key={i}
      d={villainInfo[key]?.overlay || combinedButtons[key].d}
      className={styles.btn}
      onClick={(e) => {
        e.stopPropagation();
        if (moved) return;
        btnClickHandler(key);
      }}
    />
  ));
};

export default Buttons;
