import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../context/AxiosContext";

export const useAddComment = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addComment = async (id: number) => {
    await axios.post(`posts/${id}/comment`);
  };

  return useMutation(addComment, {
    onError: (error) => console.log(error),
  });
};
