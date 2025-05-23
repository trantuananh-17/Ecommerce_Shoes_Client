import { Search } from "lucide-react";
import ButtonSearch from "./ButtonSearch";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onSearch,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative w-80">
        <div className="flex items-center border border-blue-500 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tìm kiếm thương hiệu..."
            className="flex-1 py-2 px-4 text-sm text-gray-900 bg-transparent focus:outline-none dark:placeholder-gray-400 dark:text-white"
          />

          <ButtonSearch onClick={onSearch} icon={Search} />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
