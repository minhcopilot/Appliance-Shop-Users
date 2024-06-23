import { motion } from "framer-motion";

export const Facebook = () => (
  <motion.svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    whileHover={{
      translateY: -4,
    }}
  >
    <path
      fill="currentColor"
      d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h6v-5.5H6V8h2V6a3 3 0 013-3h2v2.5h-1c-.552 0-1-.052-1 .5v2h2.5l-1 2.5H11V16h3c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"
    />
  </motion.svg>
);
