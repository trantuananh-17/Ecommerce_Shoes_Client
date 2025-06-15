import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  averageRating: number;
}

const AverageRating: React.FC<Props> = ({ averageRating }) => {
  const roundedRating = Math.round(averageRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 === 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-[2px] text-yellow-500 mt-2">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="w-5 h-5" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="w-5 h-5" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="w-5 h-5 text-gray-400" />
      ))}
    </div>
  );
};

export default AverageRating;
