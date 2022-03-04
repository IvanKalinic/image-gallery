import { EditIcon } from "@chakra-ui/icons";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { usePosts } from "../../../context";
import { PostData } from "../../../types";
import NewPost from "../NewPost";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openedPost: PostData;
}
const PostDetails = ({ isOpen, setIsOpen, openedPost }: Props) => {
  const { posts } = usePosts();

  const handleEdit = () => {
    //logic for editing post
  };

  //

  return (
    <Flex
      flexDirection="column"
      zIndex="100"
      ml="16rem"
      position="relative"
      top="9rem"
      right="7rem"
    >
      {!isOpen ? (
        <>
          <EditIcon
            position="absolute"
            top="-2rem"
            right="-4rem"
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
        </>
      ) : (
        <NewPost isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </Flex>
  );
};

export default PostDetails;
