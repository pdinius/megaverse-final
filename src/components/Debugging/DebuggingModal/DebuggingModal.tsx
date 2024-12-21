import { FC } from "react";
import styles from "./DebuggingModal.module.scss";

interface DebuggingModalProps {
  isOpen: boolean;
  toggleOpen: (b: boolean) => void;
  danger?: boolean;
  children: React.ReactNode;
}

const DebuggingModal: FC<DebuggingModalProps> = ({
  children,
  danger,
  isOpen,
  toggleOpen,
}) => {
  return (
    <div
      className={styles.backdrop}
      style={{ display: isOpen ? undefined : "none" }}
      onClick={() => toggleOpen(false)}
    >
      <div
        className={`${styles.container} ${danger ? styles.red : ""}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DebuggingModal;
