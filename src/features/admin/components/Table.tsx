export interface Column {
  key: string; 
  label: string; 
}

interface TableProps {
  columns: Column[];
  data: Array<{ [key: string]: any; id: string }>;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Table({ columns, data, onEdit, onDelete }: TableProps) {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="border px-4 py-2 text-gray-800">
              {column.label}
            </th>
          ))}
          <th className="border px-4 py-2 text-gray-800">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border">
            {columns.map((column) => (
              <td key={column.key} className="border px-4 py-2 text-gray-800">
                {row[column.key]}
              </td>
            ))}
            <td className="border px-4 py-2">
              <button
                className="mr-2 bg-blue-500 text-white px-2 py-1"
                onClick={() => onEdit(row.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => onDelete(row.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
