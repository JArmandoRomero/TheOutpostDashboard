import { useState } from "react"
import { apiFetch } from "../utils/api"

export default function CreateFormModal({ open, onClose, onCreated }) {
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!open) return null

  const submit = async () => {
    try {
      setLoading(true)
      setError(null)

      await apiFetch("/api/forms/create", {
        method: "POST",
        body: JSON.stringify({
          clientName: clientName || null,
          clientEmail: clientEmail || null,
        }),
      })

      // ✅ Success flow
      onCreated?.()   // refresh forms list
      onClose()       // close modal immediately
    } catch (err) {
      console.error("Create form failed:", err)
      setError(err.message || "Failed to generate form link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-6">
          Create Client Intake Form
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Client name</label>
            <input
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Client email</label>
            <input
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="bg-white text-black px-4 py-2 rounded text-sm font-medium"
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>
      </div>
    </div>
  )
}
