import type { LucideIcon } from "lucide-react";

type Props = {
  onClick: () => void;
  icon: LucideIcon;
};

const ButtonSearch: React.FC<Props> = ({ onClick, icon: Icon }) => {
  return (
    <button
      className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-3 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
      type="button"
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default ButtonSearch;
