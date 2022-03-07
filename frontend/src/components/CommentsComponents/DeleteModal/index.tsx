import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { usePosts } from "../../../context";
import { useDeleteComment } from "../../../hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comment: any;
  setEnlarge: React.Dispatch<React.SetStateAction<boolean>>;
  setResize: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteModal = ({
  isOpen,
  setIsOpen,
  comment,
  setEnlarge,
  setResize,
}: Props) => {
  const { openedPost } = usePosts();
  const deleteComment = useDeleteComment(openedPost?._id);

  const onSubmit = async () => {
    await deleteComment.mutate(comment?.id, {
      onSuccess: () => {
        if (
          openedPost?.saveDimensions &&
          openedPost?.saveDimensions?.height < 10.75 &&
          openedPost?.saveDimensions?.width < 17.75
        ) {
          setEnlarge(true);
          setResize(false);
        }
        setIsOpen(false);
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      size={"sm"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Do you want to delete <b>{comment.content}</b>?
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="gray"
            onClick={() => setIsOpen(false)}
            mr="1rem"
            w="5rem"
          >
            Close
          </Button>
          <Button
            w="5rem"
            colorScheme="blue"
            onClick={onSubmit}
            isLoading={deleteComment.isLoading}
            _hover={{ bg: "#092c39" }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
