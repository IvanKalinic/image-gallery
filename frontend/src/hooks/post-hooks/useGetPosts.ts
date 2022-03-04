import { useQuery } from "react-query";
import { useAxios } from "../../context/AxiosContext";
import { PostData } from "../../types";

export const useGetPosts = () => {
  const axios = useAxios();

  const fetchPosts = async (): Promise<PostData[] | undefined> => {
    try {
      const { data } = await axios.get("/posts");
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery("fetchPosts", async () => await fetchPosts(), {
    onError: (error) => console.log(error),
    staleTime: Infinity,
  });
};
