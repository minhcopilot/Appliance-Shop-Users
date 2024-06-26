"use client";
import React, { use } from "react";
import { motion } from "framer-motion";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useLike } from "@/hooks/blog/useLike";
import axiosClient from "@/config/axiosClient";

type Props = {
  url: string;
};

export default function LikeButton({ url }: Props) {
  const [like, setLike] = useLike(url)((state) => [state.like, state.setLike]);
  React.useEffect(() => {
    axiosClient.get("/article/posts/" + url + "/view", {
      withCredentials: true,
    });
  }, []);
  return (
    <motion.div
      whileTap={{ scale: 0.9, filter: "drop-shadow(0 1px 1px gray)" }}
      whileHover={{
        scale: 1.1,
        filter: "drop-shadow(0 0 2px gray)",
      }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        setLike();
      }}
      style={{
        cursor: "pointer",
        position: "absolute",
        top: 10,
        right: 10,
        fontSize: 30,
        color: "red",
        filter: "drop-shadow(0 0 1px gray)",
      }}
    >
      {like ? <HeartFilled color="red" /> : <HeartOutlined color="red" />}
    </motion.div>
  );
}
