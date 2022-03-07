import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks";
import { PostData } from "../types";

const defaultValues = {
  _id: "",
  description: "",
  img: "",
  comments: [{ id: "", content: "" }],
};

type ContextType = {
  posts: any;
  setPosts: React.Dispatch<React.SetStateAction<any>>;
  image: any;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  imageSize: { width: number; height: number };
  setImageSize: React.Dispatch<React.SetStateAction<any>>;
  openedPost: PostData;
  setOpenedPost: React.Dispatch<React.SetStateAction<PostData>>;
};

const PostsContext = createContext<ContextType>({
  posts: [],
  setPosts: () => null,
  image: null,
  setImage: () => null,
  imageSize: { width: 0, height: 0 },
  setImageSize: () => null,
  openedPost: defaultValues,
  setOpenedPost: () => null,
});

export const usePosts = () => {
  const moviesContext = useContext(PostsContext);

  if (moviesContext === undefined) {
    throw new Error("usePosts must be inside of its provider");
  }
  return moviesContext;
};

interface Props {
  children: React.ReactChild;
}

export const PostsProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const [image, setImage] = useState<any>(null);
  const [openedPost, setOpenedPost] = useState<PostData>(defaultValues);
  const [imageSize, setImageSize] = useLocalStorage("imageSize", {
    height: 0,
    width: 0,
  });

  const value = useMemo(
    () => ({
      posts,
      setPosts,
      image,
      setImage,
      imageSize,
      setImageSize,
      openedPost,
      setOpenedPost,
    }),
    [
      posts,
      setPosts,
      image,
      setImage,
      imageSize,
      setImageSize,
      openedPost,
      setOpenedPost,
    ]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
