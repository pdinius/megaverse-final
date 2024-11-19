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
  const { actionTokens, spentActionTokens, modifyActionTokens } =
    useContext(statusContext);

  return (
    <div className={styles.container}>
      <img src={TOKEN_SRCS[actionKey]} />
      <button
        className={styles.caretBtn}
        disabled={spentActionTokens[actionKey] === 0}
        onClick={() => modifyActionTokens(actionKey, -1)}
      >
        <Icon which={"caret-left"} />
      </button>
      {spentActionTokens[actionKey]}
      <button
        className={styles.caretBtn}
        disabled={spentActionTokens[actionKey] === actionTokens[actionKey]}
        onClick={() => modifyActionTokens(actionKey, 1)}
      >
        <Icon which={"caret-right"} />
      </button>
    </div>
  );
};

export default TokenSelector;
