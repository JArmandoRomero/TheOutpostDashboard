export default function Table() {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {['Jane','John','Alex'].map(name => (
            <tr key={name} className="border-t">
              <td className="p-4">{name}</td>
              <td className="p-4">{name.toLowerCase()}@mail.com</td>
              <td className="p-4">Admin</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}