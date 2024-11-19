import { FC } from "react";
import styles from "./BackgroundImage.module.scss";

interface BackgroundImageProps {
  src: string;
}

const BackgroundImage: FC<BackgroundImageProps> = ({ src }) => (
  <div className={styles.container}>
    <img src={src} />
  </div>
);

export default BackgroundImage;
