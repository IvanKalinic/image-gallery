import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useDeleteComment = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const deleteComment = async (id: number) => {
    await axios.delete(`posts/${id}/comment`);
  };

  return useMutation(deleteComment, {
    onError: (error) => console.log(error),
  });
};
