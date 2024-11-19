import { FC, HTMLProps, useContext, useEffect, useRef, useState } from "react";
import styles from "./Accordion.module.scss";
import { statusContext } from "../../../StatusContext";
import { Icon } from "../Icon";

interface AccordionProps extends HTMLProps<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

const Accordion: FC<AccordionProps> = ({ children, title, subtitle }) => {
  const { currentAction } = useContext(statusContext);
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentAction === "") setOpen(false);
  }, [currentAction]);

  return (
    <div
      className={styles.container}
      style={{ marginBlock: open ? "0.5rem" : "0rem" }}
    >
      <div className={styles.summary} onClick={() => setOpen(!open)}>
        <span className={styles.title}>{title}</span>
        <span className={styles.subtitle} title={subtitle}>
          {subtitle ? <>- {subtitle.slice(0,20)}{subtitle.length > 20 ? <> &hellip;</> : null}</> : null}
        </span>
        <Icon
          which="up-chevron"
          className={styles.chevron}
          style={{ rotate: open ? "0deg" : "-180deg" }}
        />
      </div>
      <div
        className={styles.contentContainer}
        style={{
          height: open ? `${contentRef.current?.clientHeight}px` : "0px",
        }}
      >
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
