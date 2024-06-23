import { motion } from "framer-motion";

export const Pocket = () => (
  <motion.svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="75.247 261.708 445.529 401.074"
    whileHover={{
      translateY: -4,
    }}
  >
    <path
      fill="currentColor"
      d="M114.219 261.708c-24.275 1.582-38.972 15.44-38.972 40.088v147.611c0 119.893 119.242 214.114 222.393 213.37 115.986-.837 223.137-98.779 223.137-213.37V301.796c0-24.741-15.626-38.693-40.088-40.088h-366.47zm93.943 120.079L297.64 466.8l89.571-85.013c40.088-16.835 57.574 28.927 41.111 42.321L311.685 535.443c-3.813 3.628-24.183 3.628-27.996 0L167.051 424.107c-15.72-14.789 4.743-61.295 41.111-42.32z"
    />
  </motion.svg>
);