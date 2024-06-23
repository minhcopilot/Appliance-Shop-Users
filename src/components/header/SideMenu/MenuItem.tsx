import * as React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import { Menu } from "antd";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.li variants={variants} className={styles.motionLi}>
      {children}
    </motion.li>
  );
};
