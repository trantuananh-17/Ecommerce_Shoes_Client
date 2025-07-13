import type { LucideIcon } from "lucide-react";

type Props = {
  name: string;
  onClick: () => void;
  icon: LucideIcon;
};

const ButtonForm: React.FC<Props> = ({ name, onClick, icon: Icon }) => {
  return (
    <>
      <button
        className="focus:outline-none flex gap-1 items-center text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-900 "
        type="submit"
        onClick={onClick}
      >
        <Icon className="w-5 h-5" />
        <span>{name}</span>
      </button>
    </>
  );
};

export default ButtonForm;
