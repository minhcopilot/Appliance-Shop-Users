import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../OnlineShop/hooks/useAuth";
import axiosClient from "@/config/axiosClient";

export const useGetContent = (id: number | null) => {
  // const token = useAuth((state) => state.token);
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

  return result;
};
