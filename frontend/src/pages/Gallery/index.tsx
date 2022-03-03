import { useUser } from "../../context";

const Gallery = () => {
  const { user } = useUser();
  console.log(user?.email);
  return <div>Gallery</div>;
};

export default Gallery;
