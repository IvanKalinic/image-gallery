import { EditIcon } from "@chakra-ui/icons";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { usePosts } from "../../../context";
import { useMediaQuery } from "@chakra-ui/react";
import { CommentsPopup } from "../../CommentsComponents";
import NewPost from "../NewPost";
import "./index.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const PostDetails = ({ isOpen, setIsOpen, isMobile }: Props) => {
  const { posts, openedPost, setOpenedPost } = usePosts();
  const queryClient = useQueryClient();
  const imageResize = useMediaQuery("(max-width: 80rem)");
  const smallImageSize = useMediaQuery("(max-width: 65rem)");

  const handleEdit = () => {
    //logic for editing post
  };

  useEffect(() => {
    const fetchFirstPost = async () => {
      if (!posts) await queryClient.invalidateQueries("fetchPosts");
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
        <Flex flexDirection="column">
          <EditIcon
            position="fixed"
            top="6rem"
            right="2rem"
            w="2rem"
            h="2rem"
            cursor="pointer"
            onClick={handleEdit}
          />

          <Image
            onLoad={(e: any) => e.target.classList.add("active-img")}
            width={
              imageResize[0] && !smallImageSize[0]
                ? "50vw"
                : smallImageSize[0] && !isMobile
                ? "30vw"
                : isMobile
                ? "90vw"
                : "60rem"
            }
            height="30rem"
            mr={isMobile ? "5rem" : "1rem"}
            ml={isMobile ? "-15rem" : "1rem"}
            objectFit="cover"
            src={`${process.env.REACT_APP_BACKEND_PUBLIC_FOLDER}/${openedPost?.img}`}
          />

          <Text
            fontSize="2rem"
            fontWeight="700"
            mt="2rem"
            ml={isMobile ? "-30rem" : "0"}
            overflowY={isMobile ? "scroll" : "hidden"}
          >
            {openedPost?.description}
          </Text>
          <CommentsPopup
            openedPost={openedPost}
            setOpenedPost={setOpenedPost}
          />
        </Flex>
      ) : (
        <NewPost isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </Flex>
  );
};

export default PostDetails;
