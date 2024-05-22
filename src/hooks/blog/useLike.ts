import { axiosClient } from "@/lib/axiosClient";
import { use } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface likeInterface {
  like: boolean;
  setLike: () => void;
}

export const useLike = (url: string) =>
  create<likeInterface>()(
    persist(
      (set, get) => ({
        like: false,
        setLike: async () => {
          let like = !get().like;
          let result = await axiosClient.post(
            "/article/posts/" + url + "/like",
            { like },
            { withCredentials: true }
          );
          if (result.status === 200) {
            set({ like: result.data });
          }
        },
      }),
      { name: "like-" + url }
    )
  );
