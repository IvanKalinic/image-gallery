import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  Box,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SharedList from "./SharedList";
import PostDetails from "./PostDetails";
import { PostData } from "../../types";
import NewPost from "./NewPost";
import { usePosts } from "../../context";

const defaultValues = {
  _id: "",
  description: "",
  img: "",
  comments: [{ id: "", content: "" }],
};

const ImageList = () => {
  const [isListOpen, setIsListOpen] = useState<boolean>(true);
  const [isNewOpen, setIsNewOpen] = useState<boolean>(false);
  const [openedPost, setOpenedPost] = useState<PostData>(defaultValues);
  const { posts } = usePosts();

  useEffect(() => {
    if (posts) {
      setOpenedPost(posts[0]);
    }
  }, [posts]);

  const handleClose = () => {
    setIsListOpen(false);
  };

  useEffect(() => {
    setIsListOpen(true);
  }, []);

  const handleAdd = () => {};

  console.log(openedPost);
  const isMobile = false;
  return (
    <>
      {isMobile ? (
        <Drawer isOpen={isListOpen} placement="left" onClose={handleClose}>
          <DrawerContent>
            <DrawerHeader>Image Gallery</DrawerHeader>
            <ArrowBackIcon
              w="2rem"
              h="2rem"
              onClick={handleClose}
              cursor="pointer"
              position="fixed"
              right="1rem"
              top="1rem"
            />

            <DrawerBody>
              <SharedList setOpenedPost={setOpenedPost} />
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Flex justifyContent="center">
          <Flex
            position="fixed"
            left="0"
            top="0"
            bottom="0"
            right="0"
            flexDirection="column"
            w="29rem"
            boxShadow="0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)"
            mt="5.25rem"
            overflowY="scroll"
            whiteSpace="nowrap"
            scrollBehavior="smooth"
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
            <Flex
              alignItems="center"
              justifyContent="space-between"
              position="sticky"
              zIndex="1000"
            >
              <Text
                fontWeight="700"
                fontSize="2rem"
                mt="2rem"
                ml="4rem"
                mb="4rem"
              >
                Image Gallery
              </Text>
              <Text
                mt="-2rem"
                mr="1rem"
                fontWeight="700"
                cursor="pointer"
                textTransform="uppercase"
                css={{ ":hover": { color: "red" } }}
                onClick={() => setIsNewOpen(true)}
              >
                <AddIcon w="2rem" h="2rem" mr="0.5rem" />
                New
              </Text>
            </Flex>
            <SharedList setOpenedPost={setOpenedPost} />
          </Flex>
          <PostDetails
            openedPost={openedPost}
            isOpen={isNewOpen}
            setIsOpen={setIsNewOpen}
          />
        </Flex>
      )}
    </>
  );
};

export default ImageList;
