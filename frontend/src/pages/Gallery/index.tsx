import { useUser } from "../../context";
import { FixedNavbarWrapper } from "../../styled-components";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ImageList } from "../../components";

const Gallery = () => {
  const { user } = useUser();

  return (
    <>
      <FixedNavbarWrapper>
        <Image
          cursor="pointer"
          height="4.375rem"
          width=" 4.375rem"
          borderRadius="50%"
          ml="4rem"
          src={`${process.env.REACT_APP_CLIENT_PUBLIC_FOLDER}/agilno2.png`}
        />
        <Flex alignItems="center">
          <Image
            cursor="pointer"
            height="4.375rem"
            width=" 4.375rem"
            borderRadius="50%"
            ml="4rem"
            mr="1rem"
            src={`${process.env.REACT_APP_CLIENT_PUBLIC_FOLDER}/avatar.png`}
          />
          <Text textTransform="uppercase" mr="1rem">
            {user.email.split("@")[0]}
          </Text>
          <ChevronDownIcon
            width="2rem"
            height="2rem"
            cursor="pointer"
            mr="2rem"
          />
        </Flex>
      </FixedNavbarWrapper>
      <ImageList />
    </>
  );
};

export default Gallery;
