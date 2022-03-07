import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useDeleteComment = (id: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteComment = async (commentId: string) => {
    await axios.put(`posts/${id}/comment/${commentId}`);
  };

  return useMutation(deleteComment, {
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchPost", id]);
    },
  });
};
