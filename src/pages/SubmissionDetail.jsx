import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { apiFetch } from "../utils/api"

export default function SubmissionDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    apiFetch(`/api/submissions/${id}`)
      .then(setData)
      .finally(() => setLoading(false))
  }, [id])

  const downloadAttachment = async () => {
    try {
      setDownloading(true)

      const auth = JSON.parse(localStorage.getItem("auth"))

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/submissions/${id}/attachment`,
        {
          method: "GET",
          headers: {
            ...(auth?.token && {
              Authorization: `Bearer ${auth.token}`,
            }),
          },
        }
      )

      if (!res.ok) {
        throw new Error("Failed to download attachment")
      }

      const blob = await res.blob()
      const file = data.rawData.itineraryFile

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")

      a.href = url
      a.download = file.originalName
      document.body.appendChild(a)
      a.click()

      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Download failed:", err)
      alert("Failed to download attachment")
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return <div className="text-gray-500">Loading submission…</div>
  }

  if (!data) {
    return <div className="text-red-500">Submission not found</div>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {data.destination}
          </h1>
          <p className="text-gray-600">
            {data.clientName || "Unknown client"}
          </p>
        </div>

        <Link
          to="/submissions"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to submissions
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Trip Overview">
            <Item label="Travel Dates" value={data.travelDates} />
            <Item label="Trip Length" value={data.tripLength} />
            <Item label="Hotel Budget" value={data.hotelBudget} />
          </Section>

          <Section title="Experiences">
            <Pills items={data.experiences} />
          </Section>

          <Section title="Priorities">
            <Pills items={data.priorities} />
          </Section>

          <Section title="Planning Scope">
            <Pills items={data.planning} />
          </Section>

          {/* ✅ ATTACHMENT */}
          {data.rawData?.itineraryFile && (
            <Section title="Uploaded Itinerary">
              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">
                    {data.rawData.itineraryFile.originalName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(data.rawData.itineraryFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>

                <button
                  onClick={downloadAttachment}
                  disabled={downloading}
                  className="text-blue-600 text-sm font-medium hover:underline disabled:opacity-50"
                >
                  {downloading ? "Downloading…" : "Download"}
                </button>
              </div>
            </Section>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <Section title="Travelers">
            <ul className="space-y-3">
              {data.travelers.map((t, i) => (
                <li
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <p className="font-medium text-gray-900">
                    {t.name || "Unnamed traveler"}
                  </p>

                  <p className="text-sm text-gray-600">
                    {t.dietary || "No dietary notes"}
                  </p>

                  {t.allergies && (
                    <p className="text-sm text-red-600">
                      Allergies: {t.allergies}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  )
}

/* ---------- Shared UI Components ---------- */

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4 text-gray-900">
        {title}
      </h2>
      {children}
    </div>
  )
}

function Item({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-none">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">{value || "—"}</span>
    </div>
  )
}

function Pills({ items = [] }) {
  if (!items.length) {
    return <p className="text-gray-500">—</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i, idx) => (
        <span
          key={idx}
          className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800"
        >
          {i}
        </span>
      ))}
    </div>
  )
}
