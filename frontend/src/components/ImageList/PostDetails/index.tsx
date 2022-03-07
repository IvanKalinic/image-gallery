import { EditIcon } from "@chakra-ui/icons";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { usePosts } from "../../../context";
import CommentsPopup from "../../CommentsPopup";
import NewPost from "../NewPost";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostDetails = ({ isOpen, setIsOpen }: Props) => {
  const { posts, openedPost, setOpenedPost } = usePosts();
  const queryClient = useQueryClient();

  const handleEdit = () => {
    //logic for editing post
  };

  useEffect(() => {
    const fetchFirstPost = async () => {
      if (!posts) await queryClient.invalidateQueries("fetchPosts");
      console.log(posts);
      setOpenedPost(posts[0]);
    };
    fetchFirstPost();
  }, [posts]);

  return (
    <Flex
      flexDirection="column"
      zIndex="100"
      ml="16rem"
      position="relative"
      top="9rem"
      left="5rem"
    >
      {!isOpen ? (
        <>
          <EditIcon
            position="absolute"
            top="-2rem"
            right="-7rem"
            w="2rem"
            h="2rem"
            cursor="pointer"
            onClick={handleEdit}
          />
          <Image
            width="60rem"
            height="30rem"
            mr="1rem"
            ml="1rem"
            objectFit="cover"
            src={`${process.env.REACT_APP_BACKEND_PUBLIC_FOLDER}/${openedPost?.img}`}
          />
          <Text fontSize="2rem" fontWeight="700" mt="2rem">
            {openedPost?.description}
          </Text>
          <CommentsPopup
            openedPost={openedPost}
            setOpenedPost={setOpenedPost}
          />
        </>
      ) : (
        <NewPost isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </Flex>
  );
};

export default PostDetails;
