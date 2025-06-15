interface Props {
  size: string;
  quantity: number;
  isSelected: boolean;
  onClick: (size: string) => void;
}

const SizeItem: React.FC<Props> = ({ size, quantity, isSelected, onClick }) => {
  return (
    <button
      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium border border-gray-400
        ${
          quantity === 0
            ? "bg-white text-gray-400 cursor-not-allowed"
            : isSelected
            ? "bg-black text-white border-black"
            : "bg-white text-black"
        }`}
      disabled={quantity === 0}
      onClick={() => onClick(size)}
    >
      {size}
    </button>
  );
};

export default SizeItem;
