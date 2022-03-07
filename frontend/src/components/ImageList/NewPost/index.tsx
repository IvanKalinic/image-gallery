import { ArrowLeftIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, Text, Image, Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Upload } from "../../../assets/svg";
import { useAxios, usePosts } from "../../../context";
import { buttonColor, loginColors } from "../../../global_styles";
import { UploadBoxWrapper, Icon } from "../../../styled-components";
import TextInput from "../../HelperComponents/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPostSchema } from "../../../schemas/newPostSchema";
import { useAddPost } from "../../../hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValues = {
  description: "",
  comments: [],
};
const NewPost = ({ isOpen, setIsOpen }: Props) => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const { image, setImage } = usePosts();
  const addPost = useAddPost();
  const axios = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newPostSchema),
    defaultValues: defaultValues,
  });

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

  const setEmpty = () => {
    setImage("");
    setCurrentImage("");
  };

  const handleAdd = async (newPost: any) => {
    const post = {
      description: newPost.description,
      comments: [],
      img: "",
    };
    if (image) {
      const formData = new FormData();
      formData.append("name", image.name);
      formData.append("file", image);
      post.img = image.name;
      try {
        await axios.post("/upload", formData);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await addPost.mutate(post, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="58vw"
    >
      <form onSubmit={handleSubmit(handleAdd)}>
        <Flex
          position="absolute"
          top="0rem"
          right="-4rem"
          cursor="pointer"
          alignItems="center"
          onClick={() => setIsOpen(false)}
          css={{ ":hover": { color: "blue" } }}
        >
          <ArrowLeftIcon h="2rem" w="2rem" mr="0.5rem" />
          <Text textTransform="uppercase" fontWeight="700">
            Back
          </Text>
        </Flex>
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
              <Icon onClick={setEmpty}>
                <DeleteIcon
                  width="1.5rem"
                  height="1.5rem"
                  css={{ ":hover": { color: "#8c3103" } }}
                />
              </Icon>
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
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          ml="-4rem"
        >
          <TextInput
            title="Description"
            registerName="description"
            placeholder="Enter image description..."
            register={register}
            errors={errors}
            style={{
              border: "1px solid #A0AEC0",
              borderRadius: "0",
              width: "20vw",
              height: "3rem",
              color: `${loginColors}`,
            }}
            newPost={true}
          />
          <Button
            type="submit"
            color="white"
            fontWeight="500"
            mt="2rem"
            width="20vw"
            backgroundColor={buttonColor}
            textTransform="uppercase"
            borderRadius="0"
            border="1px solid #A0AEC0"
            isLoading={addPost.isLoading}
          >
            Add
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default NewPost;
