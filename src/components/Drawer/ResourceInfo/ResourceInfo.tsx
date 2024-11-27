import { FC, useContext } from "react";
import styles from "./ResourceInfo.module.scss";
import { statusContext } from "../../../StatusContext";
import { isTag, Tag } from "../../../types/general";
import { resourceSrcs } from "../../../lib/resource-icons";

interface ResourceInfoProps {
  item: Tag | "RECOVER" | "RECOVER_F4";
}

const ResourceInfo: FC<ResourceInfoProps> = ({ item }) => {
  const {
    tags,
    specialRewards,
    tagClickHandler,
    specialRewardClickHandler,
    isTagOrSpecialRewardClickable,
  } = useContext(statusContext);

  const qtx = isTag(item) ? tags[item] : specialRewards[item];

  return (
    <div
      className={`${styles.resourceContainer} ${
        qtx > 0 || isTagOrSpecialRewardClickable(item) ? "" : styles.transparent
      }`}
    >
      <img
        src={resourceSrcs[item]}
        className={`${styles.resourceIcon} ${
          isTagOrSpecialRewardClickable(item) ? "clickable-resource" : ""
        }`}
        onClick={() =>
          isTag(item) ? tagClickHandler(item) : specialRewardClickHandler(item)
        }
      />
      <span className={styles.qtx}>{qtx}</span>
    </div>
  );
};

export default ResourceInfo;
