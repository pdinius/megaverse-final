import { FC, HTMLProps, useEffect, useState } from "react";
import styles from "./Modal.module.scss";

interface ModalProps extends HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  toggleOpen: () => void;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  toggleOpen,
  children,
  className,
  onClick,
  ...props
}) => {
  const [hidden, setHidden] = useState(true);
  const [topMoved, setTopMoved] = useState(true);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (isOpen) {
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
      }, 100);
    }
  }, [isOpen]);

  return (
    <div
      className={styles.background}
      style={{ opacity, display: hidden ? "none" : "grid" }}
      onClick={(e) => {
        e.stopPropagation();
        toggleOpen();
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
