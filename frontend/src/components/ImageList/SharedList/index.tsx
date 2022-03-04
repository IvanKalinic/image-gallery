import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { buttonColor } from "../../../global_styles";
import { useGetPosts } from "../../../hooks";
import { PostContainer } from "../../../styled-components";
import { PostData } from "../../../types";
import Searchbar from "../../Searchbar";
import ListItem from "../ListItem";

const SharedList = ({
  setOpenedPost,
}: {
  setOpenedPost: React.Dispatch<React.SetStateAction<PostData>>;
}) => {
  const [term, setTerm] = useState<string>("");
  const { data, isLoading } = useGetPosts();

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="scroll"
      height="40rem"
      pb="2rem"
      pt="4rem"
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
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt="2rem"
      >
        {data?.map((post: PostData) => (
          <Flex flexDirection="column">
            <ListItem post={post} setOpenedPost={setOpenedPost} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SharedList;
