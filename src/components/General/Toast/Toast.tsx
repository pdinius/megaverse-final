import { FC, useContext } from "react";
import styles from "./Toast.module.scss";
import { Icon } from "../Icon";
import { statusContext } from "../../../StatusContext";

interface ToastProps {}

const Toast: FC<ToastProps> = () => {
  const {
    toast: { open, message },
  } = useContext(statusContext);

  const star = (
    <div className={styles.starContainer}>
      <Icon which={"STAR"} className={styles.star} />
    </div>
  );

  return (
    <div
      className={styles.container}
      style={{ bottom: open ? "2rem" : "-2rem", opacity: open ? 1 : 0 }}
    >
      {star}
      <div className={styles.innerContainer}>{message}</div>
      {star}
    </div>
  );
};

export default Toast;
