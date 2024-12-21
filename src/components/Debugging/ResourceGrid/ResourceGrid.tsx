import { FC } from "react";
import styles from "./ResourceGrid.module.scss";
import { TAGS } from "../../../types/general";
import ResourceCell from "./ResourceCell";

const ResourceGrid: FC = () => {
  return (
    <div className={styles.container}>
      {TAGS.map((t) => (
        <ResourceCell which={t} />
      ))}
    </div>
  );
};

export default ResourceGrid;
