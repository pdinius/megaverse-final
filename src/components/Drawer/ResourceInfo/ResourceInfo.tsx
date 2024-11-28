import { FC, useContext } from "react";
import styles from "./ResourceInfo.module.scss";
import { statusContext } from "../../../StatusContext";
import { isTag, Tag } from "../../../types/general";
import { resourceSrcs } from "../../../lib/resource-icons";

interface ResourceInfoProps {
  item: Tag | "RECOVER" | "RECOVER_F4";
}

const ResourceInfo: FC<ResourceInfoProps> = ({ item }) => {
  const { tags, specialRewards, tagClickHandler, isTagClickable } =
    useContext(statusContext);

  return isTag(item) ? (
    <div
      className={`${styles.resourceContainer} ${
        tags[item] > 0 || isTagClickable(item) ? "" : styles.transparent
      }`}
    >
      <img
        src={resourceSrcs[item]}
        className={`${styles.resourceIcon} ${
          isTagClickable(item) ? "clickable-resource" : ""
        }`}
        onClick={() => tagClickHandler(item)}
      />
      <span className={styles.qtx}>{tags[item]}</span>
    </div>
  ) : (
    <div
      className={`${styles.resourceContainer} ${
        specialRewards[item] > 0 ? "" : styles.transparent
      }`}
    >
      <img src={resourceSrcs[item]} className={styles.resourceIcon} />
      <span className={styles.qtx}>{specialRewards[item]}</span>
    </div>
  );
};

export default ResourceInfo;
