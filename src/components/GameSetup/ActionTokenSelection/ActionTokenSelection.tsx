import { FC } from "react";
import styles from "./ActionTokenSelection.module.scss";
import TokenSelector from "./TokenSelector/TokenSelector";

const ActionTokenSelection: FC = () => {
  return (
    <div className={styles.container}>
      <TokenSelector actionKey={"MOVE"} />
      <TokenSelector actionKey={"HEROIC"} />
      <TokenSelector actionKey={"FIGHT"} />
      <TokenSelector actionKey={"WILD"} />
    </div>
  );
};

export default ActionTokenSelection;
