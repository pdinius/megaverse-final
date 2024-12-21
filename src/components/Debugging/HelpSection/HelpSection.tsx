import { FC } from "react";
import styles from "../Debugging.module.scss";

interface HelpSectionProps {
  title: string;
  children: React.ReactNode;
}

export const HelpSection: FC<HelpSectionProps> = ({ title, children }) => {
  return (
    <>
      <div className={`${styles.header2} ${styles.indent}`}>{title}</div>
      <div className={styles.indent2}>{children}</div>
    </>
  );
};
