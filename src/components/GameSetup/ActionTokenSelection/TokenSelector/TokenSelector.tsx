import { FC, useContext } from "react";
import styles from "./TokenSelector.module.scss";
import { statusContext } from "../../../../StatusContext";
import { ActionType } from "../../../../types/general";
import { TOKEN_SRCS } from "../../../../lib/token-images";
import { Icon } from "../../../General/Icon";

interface TokenSelectorProps {
  actionKey: ActionType;
}

const TokenSelector: FC<TokenSelectorProps> = ({ actionKey }) => {
  const { actionTokens, modifySpendingActionTokens, spendingActionTokens } = useContext(statusContext);

  return (
    <div className={styles.container}>
      <img src={TOKEN_SRCS[actionKey]} />
      <button
        className={styles.caretBtn}
        disabled={spendingActionTokens[actionKey] === 0}
        onClick={() => modifySpendingActionTokens(actionKey, -1)}
      >
        <Icon which={"caret-left"} />
      </button>
      {spendingActionTokens[actionKey]}
      <button
        className={styles.caretBtn}
        disabled={spendingActionTokens[actionKey] === actionTokens[actionKey]}
        onClick={() => modifySpendingActionTokens(actionKey, 1)}
      >
        <Icon which={"caret-right"} />
      </button>
    </div>
  );
};

export default TokenSelector;
