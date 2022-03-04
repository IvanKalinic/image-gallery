import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useAddPost = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addPost = async (post: any) => {
    try {
      await axios.post("/posts", post);
    } catch (err) {
      console.log(err);
    }
  };

  return useMutation(addPost, {
    onError: (error) => console.log(error),
    onSuccess: async () => {
      await queryClient.invalidateQueries("fetchPosts");
    },
  });
};
