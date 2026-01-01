import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiFetch } from "../utils/api"

export default function Submissions() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch("/api/submissions")
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-gray-500">Loading submissions…</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-900">
        Submissions
      </h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Client</th>
              <th className="px-6 py-4 text-left font-medium">Destination</th>
              <th className="px-6 py-4 text-left font-medium">Dates</th>
              <th className="px-6 py-4 text-left font-medium">Travelers</th>
              <th className="px-6 py-4 text-left font-medium">Submitted</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr
                key={s.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  <Link
                    to={`/submissions/${s.id}`}
                    className="hover:underline"
                  >
                    {s.clientName}
                  </Link>
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {s.destination}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {s.travelDates || "—"}
                </td>

                <td className="px-6 py-4 text-gray-900">
                  {s.travelerCount}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(s.submittedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
