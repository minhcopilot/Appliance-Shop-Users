import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axiosClient";
export const usePostSearch = (query: string) => {
  const getSearchResult = async () => {
    const response = await axiosClient.get(
      "article/posts/?type=post&limit=3&sort=updatedAt&search=" + query
    );
    return response.data;
  };
  const result = useQuery<any, Error>({
    queryFn: () => {
      return query.length === 0 ? { docs: [] } : getSearchResult();
    },
    queryKey: ["search", query],
  });
  return result;
};

export default usePostSearch;
