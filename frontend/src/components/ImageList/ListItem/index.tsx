import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import { buttonColor } from "../../../global_styles";
import { PostContainer } from "../../../styled-components";
import { PostData } from "../../../types";

interface Props {
  post: PostData;
  setOpenedPost: React.Dispatch<React.SetStateAction<PostData>>;
}
const ListItem = ({ post, setOpenedPost }: Props) => {
  return (
    <>
      <PostContainer key={post._id}>
        <Image
          width="8rem"
          height="4.56rem"
          mr="1rem"
          ml="1rem"
          objectFit="cover"
          src={`${process.env.REACT_APP_BACKEND_PUBLIC_FOLDER}/${post.img}`}
        />
        <Text fontSize="0.8rem" fontWeight="700">
          {post.description}
        </Text>
      </PostContainer>
      <Button
        type="submit"
        color="white"
        fontWeight="500"
        backgroundColor={buttonColor}
        textTransform="uppercase"
        width="5.875rem"
        height="2.5rem"
        borderRadius="0"
        border="1px solid #A0AEC0"
        cursor="pointer"
        onClick={() => setOpenedPost(post)}
        mb="2rem"
        ml="1.5rem"
        mt="0.5rem"
      >
        <Text mr="0.5rem">Review</Text>
        <ArrowForwardIcon />
      </Button>
    </>
  );
};

export default ListItem;
