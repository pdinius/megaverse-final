import { FC, useContext } from "react";
import styles from "./Resources.module.scss";
import { TAGS } from "../../../types/general";
import { statusContext } from "../../../StatusContext";
import { resourceSrcs } from "../../../lib/resource-icons";

const Resources: FC = () => {
  const { tags, tagClickHandler, isTagClickable } = useContext(statusContext);

  return TAGS.map((t, i) => {
    const qtx = tags[t];

    return (
      <div
        key={i}
        className={`${styles.resourceContainer} ${
          qtx > 0 || isTagClickable(t) ? "" : styles.transparent
        }`}
      >
        <img
          src={resourceSrcs[t]}
          className={`${styles.resourceIcon} ${
            isTagClickable(t) ? "clickable-pulse" : ""
          }`}
          onClick={() => tagClickHandler(t)}
        />
        <span className={styles.qtx}>{qtx}</span>
      </div>
    );
  });
};

export default Resources;
