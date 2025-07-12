interface Props {
  name: string;
  primary?: boolean;
  onClick?: () => void;
}

const ButtonSubmit: React.FC<Props> = ({ name, primary, onClick }) => {
  return (
    <>
      <button
        className={
          primary
            ? "bg-black text-white w-full py-4  rounded-md"
            : "bg-gray-200 text-gray-600 w-full rounded-md"
        }
        onClick={onClick}
      >
        {name}
      </button>
    </>
  );
};

export default ButtonSubmit;
