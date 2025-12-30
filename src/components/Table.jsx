export default function Table({ columns, data }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="p-4 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="p-4">
                    {col.key === "role" ? (
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          row.role === "ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {row.role}
                      </span>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
