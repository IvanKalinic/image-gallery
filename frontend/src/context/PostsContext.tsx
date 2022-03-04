import React, { createContext, useContext, useMemo, useState } from "react";

type ContextType = {
  posts: any;
  setPosts: React.Dispatch<React.SetStateAction<any>>;

  image: any;
  setImage: React.Dispatch<React.SetStateAction<any>>;
};

const PostsContext = createContext<ContextType>({
  posts: [],
  setPosts: () => null,

  image: null,
  setImage: () => null,
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

  const value = useMemo(
    () => ({
      posts,
      setPosts,
      image,
      setImage,
    }),
    [posts, setPosts, image, setImage]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
