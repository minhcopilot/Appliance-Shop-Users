import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../OnlineShop/hooks/useAuth";
import axiosClient from "@/config/axiosClient";
import { useChat } from "./useSocket";

export const useGetContent = () => {
  const chatId = useChat((state) => state.chatId);
  const getMessage = async () => {
    try {
      const response = chatId
        ? await axiosClient.get(
            `/chat/content/client/${chatId.id}/?name=${chatId.customerName}&phoneNumber=${chatId.phoneNumber}`
          )
        : { data: [] };
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const result = useQuery<any, Error>({
    queryKey: ["chatContent", chatId?.id],
    queryFn: getMessage,
  });

  return result;
};
