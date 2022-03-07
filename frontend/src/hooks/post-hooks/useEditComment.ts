import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useEditComment = (id: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editComment = async (comment: any) => {
    await axios.put(`posts/${id}/comment`, comment);
  };

  return useMutation(editComment, {
    onError: (error) => console.log(error),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["fetchPost", id]);
    },
  });
};
