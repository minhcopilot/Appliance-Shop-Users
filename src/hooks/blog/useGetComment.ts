import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axiosClient";

const useGetComments = (url: string) => {
  const getComment = async () => {
    const response = await axiosClient.get(
      "article/posts/" + url + "/comments"
    );
    return response.data;
  };
  const result = useQuery<any, Error>({
    queryFn: getComment,
    queryKey: ["get", "comments"],
  });
  return result;
};

export default useGetComments;
