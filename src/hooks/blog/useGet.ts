import { AxiosError, AxiosResponse } from "axios";
import { axiosClient } from "@/lib/axiosClient";

interface ErrorResponse extends AxiosResponse {
  data: { message: string[]; statusCode: number };
}

export interface Error extends AxiosError {
  response: ErrorResponse;
}

export const getSubject = async (subject: string, id?: string | null) => {
  const url = !id ? subject : subject + "/" + id;
  try {
    const result = await axiosClient.get(url, { withCredentials: true });
    return result.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
    return null;
  }
};
