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
import {
  ChevronLeftIcon,
  SmallCloseIcon,
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { AddComent, Comments } from "../../assets/svg";
import { Circle } from "../../styled-components";
import { navbarColor } from "../../global_styles";
import { PostData } from "../../types";
import Comment from "../Comment";
import CommentImage from "../CommentImage";
import { v4 as uuidv4 } from "uuid";
import { useAddComment, useDeleteComment } from "../../hooks";
import { usePosts, useUser } from "../../context";

interface Props {
  openedPost: PostData;
}

const CommentsPopup = ({ openedPost }: Props) => {
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [firstElementPosition, setFirstElementPosition] = useState<number>(0);
  const [resize, setResize] = useState<boolean>(false);
  const [enlarge, setEnlarge] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  // const [postAdded, setPostAdded] = useState<boolean>(false);

  // const queryClient = useQueryClient();
  const { user } = useUser();
  const { setImageSize } = usePosts();
  const addComent = useAddComment(openedPost?._id);
  const deleteComment = useDeleteComment();

  useEffect(() => {
    if (firstElementPosition > 0 && firstElementPosition < 450) {
      setResize(true);
    } else {
      setResize(false);
      setImageSize(null);
    }
  }, [firstElementPosition]);

  // useEffect(() => {
  //   if (postAdded) {
  //   }
  // }, [postAdded]);

  const handleAddComment = async () => {
    if (inputValue) {
      const comment = {
        id: uuidv4(),
        content: inputValue,
        createdBy: user?.email,
      };
      try {
        await addComent.mutate(comment, {
          onSuccess: () => {
            setInputValue("");
            // setPostAdded(true);
            // await queryClient.invalidateQueries("fetchPosts");
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment.mutate(openedPost._id, {
        onSuccess: () => {
          setEnlarge(true);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

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
          borderTopLeftRadius="0.25rem"
          borderTopRightRadius="0.25rem"
        >
          <Flex alignItems="center">
            <ChevronLeftIcon
              onClick={() => setOpenComments(false)}
              mr="2rem"
              w="2rem"
              h="2rem"
              color="#4A5568"
            />
            <Text>{openedPost?.description}</Text>
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
              enlarge={enlarge}
              setEnlarge={setEnlarge}
            />
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              position="fixed"
              maxHeight="15rem"
              bottom="3rem"
              overflow="visible"
            >
              {openedPost?.comments &&
                openedPost?.comments?.map((comment: any, index: number) => (
                  <Comment
                    setFirstElementPosition={setFirstElementPosition}
                    content={comment.content}
                    key={comment?.id}
                    createdBy={comment?.createdBy}
                    index={index}
                  />
                ))}
            </Flex>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Flex alignItems="center" justifyContent="space-between">
            <input
              type="text"
              id="comment"
              name="comment"
              placeholder="LEAVE COMMENT"
              style={{
                outline: "none",
                fontWeight: "500",
                paddingLeft: "1rem",
              }}
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />
            <AddComent
              style={{ cursor: "pointer" }}
              onClick={handleAddComment}
            />
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default CommentsPopup;
