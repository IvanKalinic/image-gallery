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

const defaultValues = {
  _id: "",
  description: "",
  img: "",
  comments: [{ id: "", content: "" }],
};

const ImageList = () => {
  const [isListOpen, setIsListOpen] = useState<boolean>(true);
  const [isNewOpen, setIsNewOpen] = useState<boolean>(true);
  const [openedPost, setOpenedPost] = useState<PostData>(defaultValues);

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
            flexDirection="column"
            w="29rem"
            h="100%"
            boxShadow="0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)"
            mt="5.25rem"
          >
            <Flex alignItems="center" justifyContent="space-between">
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
