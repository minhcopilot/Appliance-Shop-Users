import { message } from "antd";
import axiosClient from "../config/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/app/AppProvider";

const useAdd = (subject: string) => {
  const token = useAppContext().sessionToken;
  const add = async (data: any) => {
    const response = await axiosClient.post(subject, data, {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
    return response.data;
  };
  const queryClient = useQueryClient();
  const result = useMutation<any, Error>(
    {
      mutationFn: add,
      mutationKey: ["add", subject],
    },
    queryClient
  );
  return result;
};

export default useAdd;
