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
  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 text-sm text-gray-600">
      <div className="mb-2 sm:mb-0">
        Hiển thị {from} tới {to} của {totalItems} dữ liệu
      </div>

      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              Trước
            </button>
          </li>

          {pages.map((page, index) =>
            typeof page === "number" ? (
              <li key={index}>
                <button
                  onClick={() => onPageChange(page)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                    currentPage === page
                      ? "text-blue-600 bg-blue-50 border-gray-300"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              </li>
            ) : (
              <li key={index}>
                <span className="flex items-center justify-center px-4 h-10 text-gray-400 select-none">
                  ...
                </span>
              </li>
            )
          )}

          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              Sau
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
