import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const pageRange = 5;

    if (totalPages <= pageRange) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + 4);
      if (endPage - startPage < pageRange) {
        startPage = Math.max(1, endPage - pageRange + 1);
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex bg-white rounded-lg justify-center mt-10 mb-20">
      <button
        className={`h-12 border-2 border-r-0 border-gray-600 px-4 rounded-l-lg cursor-pointer ${
          currentPage === 1
            ? "text-gray-400"
            : "hover:bg-gray-600 hover:text-white"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((pg, index) => (
        <button
          key={index}
          className={`h-12 border-2 border-r-0 border-gray-600 w-12 cursor-pointer hover:bg-gray-600 hover:text-white ${
            currentPage === pg ? "bg-gray-600 text-white" : ""
          }`}
          onClick={() => onPageChange(pg)}
        >
          {pg}
        </button>
      ))}

      <button
        className={`h-12 border-2  border-gray-600 px-4 rounded-r-lg cursor-pointer ${
          currentPage === totalPages
            ? "text-gray-400 "
            : "hover:bg-gray-600 hover:text-white"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
