interface Props {
  name: string;
  primary?: boolean;
}

const ButtonSubmit: React.FC<Props> = ({ name, primary }) => {
  return (
    <>
      <button
        className={
          primary
            ? "bg-black text-white w-full py-4  rounded-md"
            : "bg-gray-200 text-gray-600 w-full rounded-md"
        }
      >
        {name}
      </button>
    </>
  );
};

export default ButtonSubmit;
