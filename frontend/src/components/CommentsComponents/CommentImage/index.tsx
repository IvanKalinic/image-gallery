import React, { useEffect, useRef, useState } from "react";
import { PostData } from "../../../types";
import { Image } from "@chakra-ui/react";
import { useAxios } from "../../../context";

interface Props {
  openedPost: PostData;
  resize: boolean;
  setResize: React.Dispatch<React.SetStateAction<boolean>>;
  enlarge: boolean;
  setEnlarge: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommentImage = ({
  openedPost,
  resize,
  setResize,
  enlarge,
  setEnlarge,
}: Props) => {
  const imageRef = useRef<any>(null);
  const [margin, setMargin] = useState<number>(15);
  const axios = useAxios();

  const [dimensions, setDimensions] = useState<{
    height: number;
    width: number;
  }>({
    height:
      imageRef?.current?.clientHeight || openedPost?.saveDimensions?.height,
    width: imageRef?.current?.clientWidth || openedPost?.saveDimensions?.width,
  });

  const handleDimensions = async () => {
    if (dimensions?.height && dimensions?.width && openedPost?.comments) {
      const saveDimensions = {
        height: dimensions.height,
        width: dimensions?.width,
      };
      await axios.put(`/posts/${openedPost?._id}`, {
        ...openedPost,
        saveDimensions,
      });
    }
  };

  // handling enlarge and resize on change in layout
  useEffect(() => {
    if (openedPost?.comments === []) {
      setResize(false);
      setEnlarge(false);
      return;
    }
    if (resize && imageRef) {
      setDimensions({
        height: (0.8 * imageRef?.current?.clientHeight) / 16,
        width: (0.9 * imageRef?.current?.clientWidth) / 16,
      });
      handleDimensions();
      setMargin(2 * margin);
      return;
    }
    if (enlarge && imageRef) {
      setDimensions({
        height: (1.2 * imageRef?.current?.clientHeight) / 16,
        width: (1.3 * imageRef?.current?.clientWidth) / 16,
      });
      handleDimensions();
      setMargin(0.5 * margin);
      return;
    }

    setResize(false);
    setEnlarge(false);
  }, [openedPost]);

  // reseting image size to defaults
  useEffect(() => {
    if (!openedPost?.comments || !openedPost?.saveDimensions) {
      setEnlarge(false);
      setResize(false);
      setMargin(0);
    }
  }, [openedPost]);

  return (
    <Image
      width={
        (resize || enlarge) && dimensions?.width
          ? `${dimensions?.width}rem`
          : "17.75rem"
      }
      height={
        (resize || enlarge) && dimensions?.height
          ? `${dimensions?.height}rem`
          : "10.75rem"
      }
      objectFit="cover"
      position="fixed"
      top="4rem"
      mb={resize || enlarge ? `-${margin}rem` : "0rem"}
      ref={imageRef}
      src={`${process.env.REACT_APP_BACKEND_PUBLIC_FOLDER}/${openedPost?.img}`}
    />
  );
};
