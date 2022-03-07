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
import {
  useAddComment,
  useDeleteComment,
  useEditComment,
  useGetPost,
} from "../../hooks";
import { usePosts, useUser } from "../../context";

interface Props {
  openedPost: PostData;
  setOpenedPost: React.Dispatch<React.SetStateAction<PostData>>;
}

const CommentsPopup = ({ openedPost, setOpenedPost }: Props) => {
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [firstElementPosition, setFirstElementPosition] = useState<number>(0);
  const [resize, setResize] = useState<boolean>(false);
  const [enlarge, setEnlarge] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const { user } = useUser();
  const { setImageSize } = usePosts();
  const { data } = useGetPost(openedPost?._id);
  const addComent = useAddComment(openedPost?._id);
  const editComment = useEditComment(openedPost?._id);

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
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditComment = async (comment: any) => {
    try {
      await editComment.mutate(comment);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (data) setOpenedPost(data);
  }, [data]);

  return (
    <Popover
      placement="top-start"
      isOpen={openComments}
      onClose={() => setOpenComments(false)}
      closeOnBlur={false}
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
              {openedPost?.comments?.map((comment: any, index: number) => (
                <Comment
                  setFirstElementPosition={setFirstElementPosition}
                  content={comment.content}
                  comment={comment}
                  key={comment?.id}
                  createdBy={comment?.createdBy}
                  index={index}
                  setEnlarge={setEnlarge}
                  setResize={setResize}
                  handleEdit={handleEditComment}
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
              onChange={handleChange}
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
