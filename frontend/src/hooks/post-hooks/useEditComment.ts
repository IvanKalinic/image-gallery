import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useEditComment = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const editComment = async (id: number) => {
    await axios.put(`posts/${id}/comment`);
  };

  return useMutation(editComment, {
    onError: (error) => console.log(error),
  });
};
