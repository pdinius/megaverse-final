import { FC, HTMLProps, useEffect, useRef, useState } from "react";
import styles from "./DrawerContainer.module.scss";

const DrawerContainer: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  style,
  ...props
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [marginRight, setMarginRight] = useState(0);

  useEffect(() => {
    if (titleRef.current === null) return;
    setMarginRight(titleRef.current.clientWidth + 16);
  }, [titleRef.current]);

  return (
    <div className={styles.container}>
      <div
        className={`${className} ${styles.innerContainer}`}
        style={{ ...style, marginRight }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default DrawerContainer;
