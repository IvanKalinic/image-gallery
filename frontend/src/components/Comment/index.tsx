import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useUser } from "../../context";
import { existingCommentColor, navbarColor } from "../../global_styles";

interface Props {
  content: string;
  index: number;
  setFirstElementPosition: React.Dispatch<React.SetStateAction<number>>;
  createdBy?: string;
}
const Comment = ({
  createdBy,
  content,
  index,
  setFirstElementPosition,
}: Props) => {
  const firstCommentRef = useRef<any>(null);
  const { user } = useUser();

  useEffect(() => {
    if (firstCommentRef && index === 0) {
      setFirstElementPosition(
        firstCommentRef?.current?.getBoundingClientRect().top
      );
    }
  }, [index, firstCommentRef?.current?.getBoundingClientRect().top]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      backgroundColor={
        user?.email === createdBy ? navbarColor : existingCommentColor
      }
      w="15.56rem"
      h="5.625rem"
      fontSize="0.8rem"
      mb="1rem"
      mr={user?.email === createdBy ? "-2rem" : "0"}
      ref={firstCommentRef}
    >
      <Text
        fontWeight="900"
        color="black"
        p={["1rem", "0.5rem", "1rem", "0.5rem"]}
      >
        {content}
      </Text>
    </Flex>
  );
};

export default Comment;
