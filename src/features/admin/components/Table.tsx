
import React from 'react';
interface Column {
  header: string;
  accessor: string;
}
interface TableProps {
  columns: Column[];
  data: any[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}
const Table: React.FC<TableProps> = ({ columns, data, onDelete, onEdit }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-red-200">
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="px-6 py-3 border-b-2 border-gray-200"></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
                  {row[column.accessor]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-red-600 hover:text-red-900"
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
  );
};
export default Table;
