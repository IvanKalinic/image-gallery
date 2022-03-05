import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChevronLeftIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { AddComent, Comments } from "../../assets/svg";
import { Circle } from "../../styled-components";
import { navbarColor } from "../../global_styles";
import { PostData } from "../../types";
import Comment from "../Comment";
import CommentImage from "../CommentImage";

interface Props {
  openedPost: PostData;
}

const CommentsPopup = ({ openedPost }: Props) => {
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [firstElementPosition, setFirstElementPosition] = useState<number>(0);
  const [resize, setResize] = useState<boolean>(false);

  useEffect(() => {
    if (firstElementPosition > 0 && firstElementPosition < 400) {
      setResize(true);
    }
  }, [firstElementPosition]);

  console.log(resize);

  return (
    <Popover
      placement="top-start"
      isOpen={openComments}
      onClose={() => setOpenComments(false)}
    >
      <PopoverTrigger>
        <Circle>
          {openComments ? (
            <SmallCloseIcon onClick={() => setOpenComments(false)} />
          ) : (
            <Comments onClick={() => setOpenComments(true)} />
          )}
        </Circle>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader
          fontWeight="semibold"
          cursor="pointer"
          backgroundColor={navbarColor}
        >
          <Flex alignItems="center">
            <ChevronLeftIcon
              onClick={() => setOpenComments(false)}
              mr="2rem"
              w="2rem"
              h="2rem"
              color="#4A5568"
            />
            <Text>Popover placement</Text>
          </Flex>
        </PopoverHeader>
        <PopoverBody h="30rem">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <CommentImage
              openedPost={openedPost}
              resize={resize}
              setResize={setResize}
            />

            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="fixed"
              maxHeight="15rem"
              bottom="3rem"
              overflow="visible"

              //   overflowX="hidden"
              //   whiteSpace="nowrap"
              //   scrollBehavior="smooth"
            >
              {openedPost?.comments &&
                openedPost?.comments?.map((comment: any, index: number) => (
                  <Comment
                    setFirstElementPosition={setFirstElementPosition}
                    content={comment.content}
                    key={comment?.id}
                    index={index}
                  />
                ))}
            </Flex>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Flex alignItems="center" justifyContent="space-between">
            <Text textTransform="uppercase" fontSize="1rem" fontWeight="500">
              Leave comment
            </Text>
            <AddComent style={{ cursor: "pointer" }} />
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default CommentsPopup;
