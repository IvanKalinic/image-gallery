import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { buttonColor } from "../../../global_styles";
import { useGetPosts } from "../../../hooks";
import { PostContainer } from "../../../styled-components";
import { PostData } from "../../../types";
import Searchbar from "../../Searchbar";

const SharedList = ({
  setOpenedPost,
}: {
  setOpenedPost: React.Dispatch<React.SetStateAction<PostData>>;
}) => {
  const [term, setTerm] = useState<string>("");
  const { data, isLoading } = useGetPosts();

  // const handleOpen = (post: PostData) => {
  //   console.log(post);
  // };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="scroll"
      height="42rem"
      pb="2rem"
      css={{
        "&::-webkit-scrollbar": {
          width: "0.313rem",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "1.25rem",
          border: "0.375rem solid",
          color: "#ccd5d9",
          backgroundClip: "content-box",
        },
        "&::-webkit-scrollbar-thumb: hover": {
          color: "#a8bbbf",
        },
      }}
    >
      <Searchbar term={term} setTerm={setTerm} />
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        {data?.map((post: PostData) => (
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
            <Button
              type="submit"
              color="white"
              fontWeight="500"
              mt="0.5rem"
              ml="0.5rem"
              backgroundColor={buttonColor}
              textTransform="uppercase"
              width="5.875rem"
              height="2.5rem"
              borderRadius="0"
              border="1px solid #A0AEC0"
              cursor="pointer"
              onClick={() => setOpenedPost(post)}
            >
              Review
            </Button>
          </PostContainer>
        ))}
      </Flex>
    </Flex>
  );
};

export default SharedList;
