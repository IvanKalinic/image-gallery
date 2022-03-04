import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { UploadBoxWrapper } from "../../../styled-components";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPost = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="58vw"
    >
      <UploadBoxWrapper image={""}></UploadBoxWrapper>
    </Flex>
  );
};

export default NewPost;
