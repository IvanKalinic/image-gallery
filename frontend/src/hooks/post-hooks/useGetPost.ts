import { useQuery } from "react-query";
import { useAxios } from "../../context/AxiosContext";
import { PostData } from "../../types";

export const useGetPost = (id: number) => {
  const axios = useAxios();

  const fetchPost = async (id: number): Promise<PostData | undefined> => {
    try {
      const { data } = await axios.get(`/posts/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery(["fetchPost", id], async () => await fetchPost(id), {
    onError: (error) => console.log(error),
    staleTime: Infinity,
  });
};
