import { Flex, Image, Text } from "@chakra-ui/react";
import { PostData } from "../../../types";

const PostDetails = ({ openedPost }: { openedPost: PostData }) => {
  return (
    <Flex
      flexDirection="column"
      zIndex="100"
      ml="16rem"
      position="relative"
      top="9rem"
      right="7rem"
    >
      <Image
        width="60rem"
        height="30rem"
        mr="1rem"
        ml="1rem"
        objectFit="cover"
        src={`${process.env.REACT_APP_BACKEND_PUBLIC_FOLDER}/${openedPost.img}`}
      />
      <Text fontSize="2rem" fontWeight="700" mt="2rem">
        {openedPost.description}
      </Text>
    </Flex>
  );
};

export default PostDetails;
