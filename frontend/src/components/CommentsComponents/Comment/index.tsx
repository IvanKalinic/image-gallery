import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useUser } from "../../../context";
import {
  buttonColor,
  existingCommentColor,
  navbarColor,
} from "../../../global_styles";
import { BasicCircle, GreyCommentCircle } from "../../../styled-components";
import { DeleteModal } from "../index";

interface Props {
  content: string;
  index: number;
  setFirstElementPosition: React.Dispatch<React.SetStateAction<number>>;
  createdBy?: string;
  setEnlarge: React.Dispatch<React.SetStateAction<boolean>>;
  setResize: React.Dispatch<React.SetStateAction<boolean>>;
  handleEdit: any;
  comment: any;
}

export const Comment = ({
  createdBy,
  content,
  index,
  setFirstElementPosition,
  setEnlarge,
  setResize,
  handleEdit,
  comment,
}: Props) => {
  const firstCommentRef = useRef<any>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { user } = useUser();
  const [edit, setEdit] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>("");

  useEffect(() => {
    if (firstCommentRef && index === 0) {
      setFirstElementPosition(
        firstCommentRef?.current?.getBoundingClientRect().top
      );
    }
  }, [index, firstCommentRef?.current?.getBoundingClientRect().top]);

  const hoverOverAction = useCallback(() => {
    if (user?.email === createdBy) setShowOptions(true);
  }, [showOptions]);

  const hoverOutAction = useCallback(() => {
    if (showOptions) setTimeout(() => setShowOptions(false), 1000);
  }, [showOptions]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setNewValue(e.target.value);
  };

  useEffect(() => {
    setShowOptions(false);
    setNewValue(content);
    setDel(false);
  }, [content]);

  const handleEditComment = () => {
    handleEdit({ ...comment, content: newValue });
    setEdit(false);
    setNewValue("");
  };

  return (
    <Flex justifyContent="space-around" alignItems="flex-end">
      {user?.email !== createdBy && <GreyCommentCircle />}
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
        onMouseOver={hoverOverAction}
        onMouseOut={hoverOutAction}
        cursor="pointer"
      >
        {edit ? (
          <Flex alignItems="center" justifyContent="center">
            <input
              type="text"
              id="editcomment"
              name="editcomment"
              style={{
                outline: "none",
                fontWeight: "500",
                paddingLeft: "1rem",
                backgroundColor: navbarColor,
                minHeight: "4rem",
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid black",
              }}
              value={newValue}
              onChange={handleChange}
            />
            <Button
              type="submit"
              color="white"
              fontWeight="500"
              backgroundColor={buttonColor}
              textTransform="uppercase"
              borderRadius="0"
              border="1px solid #A0AEC0"
              w="3.5rem"
              h="1.5rem"
              onClick={handleEditComment}
            >
              Save
            </Button>
          </Flex>
        ) : (
          <Text
            fontWeight="900"
            color="black"
            p={["1rem", "0.5rem", "1rem", "0.5rem"]}
          >
            {content}
          </Text>
        )}
        {showOptions && (
          <Flex
            position="relative"
            bottom="-1rem"
            right="-3rem"
            justifyContent="space-between"
          >
            <BasicCircle onClick={() => setEdit(!edit)}>
              <EditIcon />
            </BasicCircle>
            <BasicCircle onClick={() => setDel(!del)}>
              <DeleteIcon />
            </BasicCircle>
          </Flex>
        )}
        <DeleteModal
          isOpen={del}
          setIsOpen={setDel}
          setEnlarge={setEnlarge}
          setResize={setResize}
          comment={comment}
        />
      </Flex>
    </Flex>
  );
};
