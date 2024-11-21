import { FC, useContext } from "react";
import styles from "./ResourceInfo.module.scss";
import { statusContext } from "../../../StatusContext";
import { isTag, Tag } from "../../../types/general";
import { resourceSrcs } from "../../../lib/resource-icons";

interface ResourceInfoProps {
  t: Tag | "RECOVER" | "RECOVER_F4";
}

const ResourceInfo: FC<ResourceInfoProps> = ({ t }) => {
  const { isTagClickable, tagClickHandler, tags, specialRewards } =
    useContext(statusContext);

  const qtx = isTag(t) ? tags[t] : specialRewards[t];

  return (
    <div
      className={`${styles.resourceContainer} ${
        qtx > 0 || isTagClickable(t) ? "" : styles.transparent
      }`}
    >
      <img
        src={resourceSrcs[t]}
        className={`${styles.resourceIcon} ${
          isTagClickable(t) ? "clickable-resource" : ""
        }`}
        onClick={() => tagClickHandler(t)}
      />
      <span className={styles.qtx}>{qtx}</span>
    </div>
  );
};

export default ResourceInfo;
