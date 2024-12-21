import { FC } from "react";
import styles from "./ResourceCell.module.scss";
import { Tag } from "../../../types/general";
import { Icon } from "../../General/Icon";

interface ResourceCellProps {
  which: Tag;
}

const ResourceCell: FC<ResourceCellProps> = ({ which }) => {
  return <div className={styles.cell}>
    <Icon which={which} style={{ height: "100%" }} />
  </div>;
}

export default ResourceCell;