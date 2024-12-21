import { FC, useContext } from "react";
import styles from "./Handle.module.scss";
import { statusContext } from "../../../StatusContext";

const Handle: FC = () => {
  const { toggleDrawerOpen } = useContext(statusContext);

  return (
    <div
      className={styles.container}
      style={{
        height: "20px",
        top: "100%",
      }}
    >
      <svg
        className={styles.handle}
        viewBox="0 0 93 25"
        onClick={() => toggleDrawerOpen()}
      >
        <path d="M0,0h93l-5,2h-83z" stroke="none" />
        <path d="M-32.906,1h33.622a5.618,5.618,0,0,1,3.864,2.795c0.044,0.068,9.768,16.92,10.046,17.4a6.361,6.361,0,0,0,4.928,2.783h53.892a6.361,6.361,0,0,0,4.928,-2.778c0.278,-0.481,10,-17.333,10.046,-17.4a5.618,5.618,0,0,1,3.864,-2.8h33.644" />
        <text
          x="50%"
          y="65%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={styles.handleText}
        >
          status
        </text>
      </svg>
    </div>
  );
};

export default Handle;
