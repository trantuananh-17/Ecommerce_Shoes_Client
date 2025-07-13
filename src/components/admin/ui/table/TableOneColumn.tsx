import React from "react";

interface Table {
  id: string;
  name: string;
  active?: boolean;
}

interface TableProps {
  data: Table[];
  title: string;
  showEdit?: boolean;
  showDelete?: boolean;
  showToggle?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggle?: (id: string, enabled: boolean) => void;
}

const TableOneColumn: React.FC<TableProps> = ({
  data,
  title,
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

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {title}
            </th>
            {showToggle && (
              <th scope="col" className="px-6 py-3 text-center">
                Enabled
              </th>
            )}
            {(showEdit || showDelete) && (
              <th scope="col" className="px-6 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, active }) => (
            <tr
              key={id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {name}
              </th>

              {showToggle && (
                <td className="px-4 py-4 text-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => handleToggle(id, !!active)}
                      className="sr-only peer"
                      aria-label={`Toggle enabled for ${name}`}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full dark:border-gray-600"></div>
                  </label>
                </td>
              )}

              {(showEdit || showDelete) && (
                <td className=" text-right space-x-4 px-4">
                  {showEdit && (
                    <button
                      onClick={() => handleEdit(id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Sửa
                    </button>
                  )}
                  {showDelete && (
                    <button
                      onClick={() => handleDelete(id)}
                      className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Xóa
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOneColumn;
