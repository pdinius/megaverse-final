import { FC, useContext } from "react";
import styles from "./Toast.module.scss";
import { Icon } from "../Icon";
import { statusContext } from "../../../StatusContext";

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const { toast } = useContext(statusContext);

  const star = (
    <div className={styles.starContainer}>
      <Icon which={"star"} className={styles.star} />
    </div>
  );

  return (
    <div
      className={styles.container}
      style={{ bottom: toast ? "2rem" : "-2rem", opacity: toast ? 1 : 0 }}
    >
      {star}
      <div className={styles.innerContainer}>{toast}</div>
      {star}
    </div>
  );
};

export default Toast;
