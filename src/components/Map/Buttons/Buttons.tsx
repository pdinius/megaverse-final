import { combinedButtons } from "../../../lib/svg-info";
import { villainInfo } from "../../../lib/villain-info";
import { statusContext } from "../../../StatusContext";
import styles from "./Buttons.module.scss";
import { FC, useContext } from "react";

interface ButtonsProps {
  moved: boolean;
}

const Buttons: FC<ButtonsProps> = ({ moved }) => {
  const { availableButtons, currentAction, btnClickHandler } =
    useContext(statusContext);

  return currentAction
    ? null
    : availableButtons.map((key) => (
        <path
          key={key}
          d={villainInfo[key]?.overlay || combinedButtons[key].d}
          className={styles.btn}
          onClick={btnClickHandler(key, moved)}
        />
      ));
};

export default Buttons;
