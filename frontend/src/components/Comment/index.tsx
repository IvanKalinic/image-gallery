import { Flex, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { existingCommentColor } from "../../global_styles";

interface Props {
  content: string;
  index: number;
  setFirstElementPosition: React.Dispatch<React.SetStateAction<number>>;
}
const Comment = ({ content, index, setFirstElementPosition }: Props) => {
  const firstCommentRef = useRef<any>(null);

  if (firstCommentRef && index === 0) {
    console.log(firstCommentRef?.current?.getBoundingClientRect());
    setFirstElementPosition(
      firstCommentRef?.current?.getBoundingClientRect().top
    );
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      backgroundColor={existingCommentColor}
      w="15.56rem"
      h="5.625rem"
      fontSize="0.8rem"
      mb="1rem"
      ref={firstCommentRef}
    >
      <Text fontWeight="900" color="black">
        {content}
      </Text>
    </Flex>
  );
};

export default Comment;
