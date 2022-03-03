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

const ImageList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

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
              <SharedList />
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Flex
          flexDirection="column"
          w="29rem"
          h="100%"
          boxShadow="0 0.25rem 0.25rem rgba(0, 0, 0, 0.25)"
          mt="5.25rem"
        >
          <Text fontWeight="700" fontSize="2rem" mt="2rem" ml="-5rem">
            Image Gallery
          </Text>
          <SharedList />
        </Flex>
      )}
    </>
  );
};

export default ImageList;
