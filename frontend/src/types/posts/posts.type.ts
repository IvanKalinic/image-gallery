export type PostData = {
  _id: string;
  description: string;
  img: string;
  comments: Array<any>;
  saveDimensions?: { height: number; width: number };
};
