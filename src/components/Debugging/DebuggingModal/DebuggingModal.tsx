import { FC } from "react";
import styles from "./DebuggingModal.module.scss";

interface DebuggingModalProps {
  isOpen: boolean;
  toggleOpen: (b: boolean) => void;
  children: React.ReactNode;
}

const DebuggingModal: FC<DebuggingModalProps> = ({
  children,
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
        className={styles.container}
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
