import { motion } from "framer-motion";

export const Share = ({ ...props }) => (
  <motion.svg
    {...props}
    className="w-6 h-6 drop-shadow-xl"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    whileHover={{
      translateY: -4,
    }}
  >
    <path
      fill="currentColor"
      d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"
    />
  </motion.svg>
);
