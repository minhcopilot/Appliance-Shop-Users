import { motion } from "framer-motion";

export const HackerNews = () => (
  <motion.svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    whileHover={{
      translateY: -4,
    }}
  >
    <path
      fill="currentColor"
      d="M24 2.571A2.572 2.572 0 0021.429 0H2.571A2.572 2.572 0 000 2.571v18.857A2.572 2.572 0 002.571 24h18.857A2.572 2.572 0 0024 21.429V2.571zm-11.186 10.88v5.406h-1.682v-5.502L6.856 5.143h1.998c2.812 5.266 2.635 5.422 3.177 6.728.659-1.447.311-1.307 3.247-6.728h1.864l-4.329 8.309h.001z"
    />
  </motion.svg>
);
