import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Image, Text, Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { usePosts } from "../../../context";
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
  const [searchedPosts, setSearchedPosts] = useState<PostData[]>([]);
  const { data, isLoading } = useGetPosts();
  const { posts, setPosts } = usePosts();

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const findPosts = useCallback(
    (term) => {
      return posts?.filter((post: PostData) =>
        post.description.toUpperCase().includes(term.toUpperCase())
      );
    },
    [term]
  );

  useEffect(() => {
    setSearchedPosts(term ? findPosts(term) : data);
  }, [term, data, findPosts]);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Searchbar term={term} setTerm={setTerm} />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="0"
        maxHeight="auto"
        pb="2rem"
        mt="-15rem"
        pt="15rem"
        position="relative"
      >
        {searchedPosts?.map((post: PostData) => (
          <Flex flexDirection="column" pt="-4rem">
            <ListItem
              post={post}
              setOpenedPost={setOpenedPost}
              key={post._id}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SharedList;
