interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuantityInput: React.FC<Props> = ({
  quantity,
  onIncrease,
  onDecrease,
  onQuantityChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-5">
      <div className="flex items-center gap-3">
        <p>Số lượng: </p>
        <div className="flex items-center w-max relative">
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-xl  flex items-center justify-center"
            onClick={onDecrease}
          >
            -
          </button>
          <input
            type="text"
            className="w-[100px] h-[40px] border px-10 border-gray rounded-full text-center"
            value={quantity}
            onChange={onQuantityChange}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xl  flex items-center justify-center"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityInput;
