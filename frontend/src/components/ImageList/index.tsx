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
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SharedList from "./SharedList";
import PostDetails from "./PostDetails";
import { PostData } from "../../types";

const defaultValues = {
  _id: "",
  description: "",
  img: "",
  comments: [{ id: "", content: "" }],
};

const ImageList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [openedPost, setOpenedPost] = useState<PostData>(defaultValues);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  console.log(openedPost);
  const isMobile = false;
  return (
    <>
      {isMobile ? (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerContent>
            <DrawerHeader>Image Gallery</DrawerHeader>
            <ArrowBackIcon
              w="2rem"
              h="2rem"
              onClick={onClose}
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
            <Text
              fontWeight="700"
              fontSize="2rem"
              mt="2rem"
              ml="-5rem"
              mb="2rem"
            >
              Image Gallery
            </Text>
            <SharedList setOpenedPost={setOpenedPost} />
          </Flex>
          <PostDetails openedPost={openedPost} />
        </Flex>
      )}
    </>
  );
};

export default ImageList;
