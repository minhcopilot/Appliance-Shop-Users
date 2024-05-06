import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../OnlineShop/hooks/useAuth";
import React from "react";
import axiosClient from "@/config/axiosClient";
import { useSocket } from "./useSocket";

export const useGetContent = (id: number | null) => {
  // const token = useAuth((state) => state.token);
  const socket = useSocket();
  const getMessage = async () => {
    try {
      const response = id
        ? await axiosClient.get(
            `/chat/content/${id}`
            // {
            //   headers: {
            //     Authorization: "Bearer " + token,
            //   },
            // }
          )
        : { data: [] };
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const result = useQuery<any, Error>({
    queryKey: ["chatContent", id],
    queryFn: getMessage,
  });
  React.useEffect(() => {
    if (socket) {
      socket.on("new-message", (data: any) => {
        result.refetch();
      });
    }
    return () => {
      socket?.off("new-message");
    };
  }, [socket]);
  return result;
};
