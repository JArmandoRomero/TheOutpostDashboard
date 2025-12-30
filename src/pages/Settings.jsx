import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function Settings() {
  const { profile, updateUsername } = useUser();
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    await updateUsername(username);

    setSaving(false);
    setSuccess(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">
          Username
        </label>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />

        <button
          disabled={saving}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        {success && (
          <p className="text-green-600 text-sm mt-3">
            Username updated successfully
          </p>
        )}
      </form>
    </div>
  );
}
