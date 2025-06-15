import { Heart } from "lucide-react";

interface Props {
  isInWishlist: boolean;
}

const HeartWishList: React.FC<Props> = ({ isInWishlist }) => {
  return (
    <>
      <Heart
        size={35}
        fill={isInWishlist ? "red" : "none"}
        stroke={isInWishlist ? "red" : "currentColor"}
      />
    </>
  );
};

export default HeartWishList;
