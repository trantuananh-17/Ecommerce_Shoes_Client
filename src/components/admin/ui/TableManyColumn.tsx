import React from "react";

interface TableRow {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

interface Column {
  label: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: TableRow[];
  showEdit?: boolean;
  showDelete?: boolean;
  showToggle?: boolean;
  toggleField?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, enabled: boolean) => void;
}

const TableManyColumn: React.FC<TableProps> = ({
  columns,
  data,
  showEdit,
  showDelete,
  showToggle,
  toggleField = "active",
  onEdit,
  onDelete,
  onToggle,
}) => {
  const handleToggle = (id: string, currentActive: boolean) => {
    if (onToggle) {
      onToggle(id, !currentActive);
    }
  };

  return (
    <div className="relative my-6  overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th className="p-4">
              <input type="checkbox" className="w-4 h-4" />
            </th> */}
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
                className="bg-white border-b border-b-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* <td className="w-4 p-4">
                  <input type="checkbox" className="w-4 h-4" />
                </td> */}
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`px-2 py-3 text-gray-900 dark:text-white max-w-[100px] truncate`}
                    title={String(row[col.accessor] ?? "")}
                  >
                    {String(row[col.accessor] ?? "")}
                  </td>
                ))}
                {showToggle && (
                  <td className="px-2 py-3 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isEnabled}
                        onChange={() => handleToggle(row.id, !isEnabled)}
                        className="sr-only peer"
                        aria-label={`Toggle enabled for ${row.id}`}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </td>
                )}
                {(showEdit || showDelete) && (
                  <td className="px-2 py-3 text-right space-x-4">
                    {showEdit && (
                      <button
                        onClick={() => onEdit?.(row.id)}
                        className="bg-yellow-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                    )}
                    {showDelete && (
                      <button
                        onClick={() => onDelete?.(row.id)}
                        className="bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-red-700"
                      >
                        Delete
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
