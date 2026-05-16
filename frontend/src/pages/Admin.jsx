import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllUsersAPI, deleteUserAPI, getStatsAPI } from "../api/admin";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalMessages: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          getAllUsersAPI(user.token),
          getStatsAPI(user.token),
        ]);
        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load");
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUserAPI(id, user.token);
      setUsers(users.filter((u) => u._id !== id));
      setStats((prev) => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Review users and system metrics.
            </p>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Back to Chat
          </button>
        </div>

        {error && <p className="text-rose-600 text-sm">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 p-6 text-center">
            <p className="text-3xl font-semibold text-sky-600">
              {stats.totalUsers}
            </p>
            <p className="text-sm text-slate-500 mt-2">Total Users</p>
          </div>
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 p-6 text-center">
            <p className="text-3xl font-semibold text-sky-600">
              {stats.totalMessages}
            </p>
            <p className="text-sm text-slate-500 mt-2">Total Messages</p>
          </div>
        </div>

        <div className="bg-white rounded-[1.5rem] shadow-sm overflow-hidden border border-slate-200">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">All Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="text-left px-6 py-3">Username</th>
                  <th className="text-left px-6 py-3">Email</th>
                  <th className="text-left px-6 py-3">Role</th>
                  <th className="text-left px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {u.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          u.role === "admin"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {u.role !== "admin" && (
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="text-rose-600 hover:text-rose-700 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
