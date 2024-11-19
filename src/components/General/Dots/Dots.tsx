import { FC } from "react";
import styles from "./Dots.module.scss";

interface DotsProps {
  count: number;
  current: number;
}

const Dots: FC<DotsProps> = ({ count, current }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={`${styles.dot} ${i === current ? styles.active : ""}`}
        />
      ))}
    </div>
  );
};

export default Dots;
