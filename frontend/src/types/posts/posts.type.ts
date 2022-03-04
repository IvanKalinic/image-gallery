export type PostData = {
  _id: string;
  description: string;
  img: string;
  comments: Array<{ id: string; content: string }>;
};
