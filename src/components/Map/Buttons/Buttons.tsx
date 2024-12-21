import { combinedButtons } from "../../../lib/svg-info";
import { villainInfo } from "../../../lib/villain-info";
import { statusContext } from "../../../StatusContext";
import styles from "./Buttons.module.scss";
import { FC, useContext } from "react";

interface ButtonsProps {
  moved: boolean;
}

const Buttons: FC<ButtonsProps> = ({ moved }) => {
  const { availableButtons, btnClickHandler, testing } =
    useContext(statusContext);

  return availableButtons.map((key, i) => {
    const path = villainInfo[key]?.overlay || combinedButtons[key].d;
    return (
      <path
        key={i}
        d={path}
        className={styles.btn}
        onClick={(e) => {
          e.stopPropagation();
          if (moved) return;
          if (testing && navigator) navigator.clipboard.writeText(key);
          btnClickHandler(key);
        }}
      />
    );
  });
};

export default Buttons;
