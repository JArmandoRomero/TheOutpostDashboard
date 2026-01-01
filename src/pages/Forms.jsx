import { useEffect, useState } from "react"
import CreateFormModal from "../components/CreateFormModal"
import { apiFetch } from "../utils/api"

export default function Forms() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const loadForms = async () => {
    try {
      setLoading(true)

      const data = await apiFetch("/api/forms")
      setForms(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Error loading forms:", err)
      setForms([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadForms()
  }, [])

  if (loading) {
    return <div className="text-gray-500">Loading forms…</div>
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Forms</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          Create Form
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Client</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-left font-medium">Created</th>
              <th className="px-6 py-4 text-left font-medium">Link</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((f) => (
              <tr
                key={f.id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {f.clientName || "—"}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={f.status} />
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(f.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${window.location.origin}/form/${f.id}`
                      )
                    }
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Copy link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <CreateFormModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={loadForms}
      />
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    submitted: "bg-gray-100 text-gray-700",
    expired: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  )
}
