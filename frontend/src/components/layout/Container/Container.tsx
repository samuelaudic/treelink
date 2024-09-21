import React from "react";
import styles from "./Container.module.scss";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  style,
}) => {
  return (
    <div className={styles.container + ` ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
