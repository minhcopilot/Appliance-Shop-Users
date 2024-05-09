import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axiosClient";

interface ErrorResponse extends AxiosResponse {
  data: { message: string[]; statusCode: number };
}

export interface Error extends AxiosError {
  response: ErrorResponse;
}

export const getSubject = async (subject: string, id?: string | null) => {
  const url = !id ? subject : subject + "/" + id;
  const result = await axiosClient.get(url);
  return result.data;
};
