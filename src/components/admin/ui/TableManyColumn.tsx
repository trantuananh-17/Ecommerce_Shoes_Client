import React from "react";

interface TableRow {
  id: string;
  [key: string]: string | number | boolean | undefined;
}

interface TableProps {
  columns: string[];
  data: TableRow[];
  showEdit?: boolean;
  showDelete?: boolean;
  showToggle?: boolean;
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
    <>
      <div className="relative my-2 h-[71%] overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </th>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-3">
                  {col}
                </th>
              ))}
              {showToggle && <th className="px-6 py-3 text-center">Enabled</th>}
              {(showEdit || showDelete) && (
                <th className="px-6 py-3 text-left sr-only">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {row[col.toLowerCase()] as string}
                  </td>
                ))}
                {showToggle && (
                  <td className="px-4 py-4 text-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!row.active}
                        onChange={() => handleToggle(row.id, !!row.active)}
                        className="sr-only peer"
                        aria-label={`Toggle enabled for ${row.id}`}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full dark:border-gray-600"></div>
                    </label>
                  </td>
                )}
                {(showEdit || showDelete) && (
                  <td className="px-2 py-3 text-right space-x-4">
                    {showEdit && (
                      <button
                        onClick={() => onEdit?.(row.id)}
                        className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-500 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900"
                      >
                        Edit
                      </button>
                    )}
                    {showDelete && (
                      <button
                        onClick={() => onDelete?.(row.id)}
                        className="focus:outline-none text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableManyColumn;
