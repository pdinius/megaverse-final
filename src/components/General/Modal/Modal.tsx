import { FC, HTMLProps, useContext, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { statusContext } from "../../../StatusContext";
import { ANIM_TIME } from "../../../lib/constants";

const Modal: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  const { modalOpen, toggleModalOpen } = useContext(statusContext);
  const [hidden, setHidden] = useState(true);
  const [topMoved, setTopMoved] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (modalOpen) {
      setHidden(false);
      setTimeout(() => {
        setOpacity(1);
        setTopMoved(false);
      }, 10);
    } else {
      setTopMoved(true);
      setOpacity(0);
      setTimeout(() => {
        setHidden(true);
      }, ANIM_TIME);
    }
  }, [modalOpen]);

  return (
    <div
      className={styles.background}
      style={{ opacity, display: hidden ? "none" : "grid" }}
      onClick={(e) => {
        e.stopPropagation();
        toggleModalOpen(false);
      }}
    >
      <div
        className={`${className} ${styles.container}`}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(e);
        }}
        style={{
          top: topMoved ? "-0.5rem" : "0rem",
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
