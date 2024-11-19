import { FC, useContext } from "react";
import styles from "./Resources.module.scss";
import { TAGS } from "../../../types/general";
import { statusContext } from "../../../StatusContext";
import { resourceSrcs } from "../../../lib/resource-icons";

const Resources: FC = () => {
  const { tags, tagClickHandler } = useContext(statusContext);

  return TAGS.map((t, i) => {
    const qtx = tags[t];
    const clickHandler = tagClickHandler(t);

    return (
      <div
        key={i}
        className={`${styles.resourceContainer} ${
          qtx > 0 || clickHandler ? "" : styles.transparent
        }`}
      >
        <img
          src={resourceSrcs[t]}
          className={`${styles.resourceIcon} ${
            clickHandler ? "clickable-pulse" : ""
          }`}
          onClick={clickHandler}
        />
        <span className={styles.qtx}>{qtx}</span>
      </div>
    );
  });
};

export default Resources;
