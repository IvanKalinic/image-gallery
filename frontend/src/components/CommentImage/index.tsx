import React, { useEffect, useRef, useState } from "react";
import { PostData } from "../../types";
import { Image } from "@chakra-ui/react";

interface Props {
  openedPost: PostData;
  resize: boolean;
  setResize: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommentImage = ({ openedPost, resize, setResize }: Props) => {
  const imageRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState<{
    height: number;
    width: number;
  }>({
    height: imageRef?.current?.clientHeight,
    width: imageRef?.current?.clientWidth,
  });

  console.log(imageRef?.current?.clientWidth / 16);

  useEffect(() => {
    if (resize && imageRef) {
      setDimensions({
        height: (0.5 * imageRef?.current?.clientHeight) / 16,
        width: (0.5 * imageRef?.current?.clientWidth) / 16,
      });
    } else {
      setResize(false);
    }
  }, [openedPost?.comments]);

  console.log(dimensions);

  return (
    <Image
      width={
        resize && dimensions?.width ? `${dimensions?.width}rem` : "17.75rem"
      }
      height={
        resize && dimensions?.height ? `${dimensions?.height}rem` : "10.75rem"
      }
      objectFit="cover"
      position="fixed"
      top="4rem"
      ref={imageRef}
      src={`${process.env.REACT_APP_BACKEND_PUBLIC_FOLDER}/${openedPost?.img}`}
    />
  );
};

export default CommentImage;
