interface TableRow {
  id: string;
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | { vi: string; en: string };
}

interface Column<T> {
  label: string;
  accessor: (
    row: T
  ) => string | number | boolean | undefined | { vi: string; en: string };
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showToggle?: boolean;
  toggleField?: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, enabled: boolean) => void;
}

const TableManyColumn = <T extends TableRow>({
  columns,
  data,
  showView,
  showEdit,
  showDelete,
  showToggle,
  toggleField = "isActive",
  onView,
  onEdit,
  onDelete,
  onToggle,
}: TableProps<T>) => {
  const handleToggle = (id: string, currentActive: boolean) => {
    if (onToggle) {
      onToggle(id, currentActive);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-2 py-3">
                {col.label}
              </th>
            ))}
            {showToggle && <th className="px-2 py-3 text-center">Kích hoạt</th>}
            {(showEdit || showDelete) && (
              <th className="px-2 py-3 text-left sr-only">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const isEnabled = !!row[toggleField];
            return (
              <tr
                key={row.id}
                className="bg-white border-b border-b-gray-300   hover:bg-gray-50 "
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-2 py-3 text-gray-900 max-w-[100px] truncate`}
                    title={String(col.accessor(row) ?? "")}
                  >
                    {String(col.accessor(row) ?? "")}
                  </td>
                ))}
                {showToggle && (
                  <td className="px-2 py-3 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => handleToggle(row.id, !!isEnabled)}
                        className="sr-only peer"
                        aria-label={`Toggle enabled for ${row.id}`}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </td>
                )}
                {(showView || showEdit || showDelete) && (
                  <td className="px-2 py-3 text-right space-x-4">
                    {showView && (
                      <button
                        onClick={() => onView?.(row.id)}
                        className="bg-green-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-yellow-700"
                      >
                        Chi tiết
                      </button>
                    )}
                    {showEdit && (
                      <button
                        onClick={() => onEdit?.(row.id)}
                        className="bg-yellow-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-yellow-700"
                      >
                        Sửa
                      </button>
                    )}
                    {showDelete && (
                      <button
                        onClick={() => onDelete?.(row.id)}
                        className="bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-red-700"
                      >
                        Xóa
                      </button>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableManyColumn;
