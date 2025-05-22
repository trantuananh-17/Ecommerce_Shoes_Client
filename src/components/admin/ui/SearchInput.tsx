import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className=" bg-white dark:bg-gray-900">
      <div className="relative ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search for items"
          className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 
             bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>
    </div>
  );
};

export default SearchInput;
