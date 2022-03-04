import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Upload } from "../../../assets/svg";
import { usePosts } from "../../../context";
import { UploadBoxWrapper, UploadIcon } from "../../../styled-components";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPost = ({ isOpen, setIsOpen }: Props) => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const { image, setImage } = usePosts();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setCurrentImage(String(e.target.result));
        }
      };
      setImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    setImage(null);
    setCurrentImage("");
  }, []);

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="58vw"
    >
      <UploadBoxWrapper image={currentImage}>
        {!image ? (
          <>
            <label htmlFor="input" style={{ cursor: "pointer" }}>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Upload />
                <Text mt="1rem">Drop an image here</Text>
              </Flex>
            </label>
            <input
              id="input"
              style={{ display: "none" }}
              type="file"
              accept=".jpg,.jpeg,.gif,.png,.jfif"
              onChange={handleImageChange}
            />
          </>
        ) : (
          <Box width="100%" height="100%" position="relative">
            <UploadIcon onClick={() => setImage("")}>
              <DeleteIcon
                width="1.5rem"
                height="1.5rem"
                css={{ ":hover": { color: "#8c3103" } }}
              />
            </UploadIcon>
            <Image
              src={currentImage}
              objectFit="cover"
              borderRadius="0.625rem"
              h="100%"
              w="100%"
            />
          </Box>
        )}
      </UploadBoxWrapper>
    </Flex>
  );
};

export default NewPost;
