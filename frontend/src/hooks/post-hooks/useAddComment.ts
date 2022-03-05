import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useAddComment = (id: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addComment = async (comment: any) => {
    await axios.post(`posts/${id}/comment`, comment);
  };

  return useMutation(addComment, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["fetchPosts"]);
    },
    onError: (error) => console.log(error),
  });
};
