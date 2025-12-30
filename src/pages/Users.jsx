import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import Table from "../components/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiFetch("/api/users/users");
        setUsers(data);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading users…</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "email", label: "Email" },
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" },
          { key: "role", label: "Role" }
        ]}
        data={users}
      />
    </div>
  );
}
