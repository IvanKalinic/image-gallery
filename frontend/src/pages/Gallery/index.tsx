import { useUser } from "../../context";
import { FixedNavbarWrapper } from "../../styled-components";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  ButtonGroup,
  PopoverFooter,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { ImageList } from "../../components";
import { buttonColor } from "../../global_styles";
import { Link } from "react-router-dom";

const Gallery = () => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Popover>
            <PopoverTrigger>
              <ChevronDownIcon
                width="2rem"
                height="2rem"
                cursor="pointer"
                mr="2rem"
                onClick={onOpen}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Logout?</PopoverHeader>

              <PopoverFooter>
                <ButtonGroup
                  cursor="pointer"
                  d="flex"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Button width="45%">No</Button>
                  <Button width="45%" backgroundColor={buttonColor}>
                    <Link to="/logout">Yes</Link>
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
      </FixedNavbarWrapper>

      <ImageList />
    </>
  );
};

export default Gallery;
