import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfileAPI, deleteAccountAPI } from "../api/user";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    setMessage("");
    setError("");
    try {
      const res = await updateProfileAPI(form, user.token);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    try {
      await deleteAccountAPI(user.token);
      logout();
      navigate("/register");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your account settings.
            </p>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Back to Chat
          </button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-lg border border-slate-200 px-8 py-8">
          <div className="mb-6">
            <p className="text-sm text-slate-500">Current username</p>
            <p className="text-lg font-medium text-slate-900 mt-1">
              {user.username}
            </p>
          </div>

          {message && (
            <p className="text-emerald-600 text-sm mb-4">{message}</p>
          )}
          {error && <p className="text-rose-600 text-sm mb-4">{error}</p>}

          <div className="space-y-4">
            <input
              name="username"
              placeholder="New username"
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            <input
              name="password"
              type="password"
              placeholder="New password"
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            />
            <button
              onClick={handleUpdate}
              className="w-full rounded-3xl bg-sky-600 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Update Profile
            </button>
            <button
              onClick={handleDelete}
              className="w-full rounded-3xl bg-rose-600 py-3 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
