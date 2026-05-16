import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { getChatHistoryAPI } from "../api/chat";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await getChatHistoryAPI(user.token);
        const history = res.data.map((m) => ({
          type: "message",
          username: m.username,
          message: m.message,
        }));
        setMessages(history);
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };

    loadHistory();
    socket.emit("user_join", user.username);
  }, []);

  useEffect(() => {
    socket.on("user_join", (msg) => {
      setMessages((prev) => [...prev, { type: "system", message: msg }]);
    });

    socket.on("user_left", (msg) => {
      setMessages((prev) => [...prev, { type: "system", message: msg }]);
    });

    socket.on("receive_message", ({ username, message }) => {
      setMessages((prev) => [...prev, { type: "message", username, message }]);
    });

    return () => {
      socket.off("user_join");
      socket.off("user_left");
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("send_message", { username: user.username, message: input });
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex h-screen max-w-5xl flex-col px-4 py-4">
        <header className="sticky top-0 z-20 bg-white rounded-[2rem] shadow-sm border border-slate-200 px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-sky-700">ChatApp</h1>
            <p className="text-sm text-slate-500 mt-1">
              Live chat with registered users
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {user.username}
            </span>
            <button
              onClick={() => navigate("/profile")}
              className="text-sky-600 hover:text-sky-700"
            >
              Profile
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="text-violet-600 hover:text-violet-700"
              >
                Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-rose-600 hover:text-rose-700"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="mt-6 flex-1 flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm">
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
            {messages.map((msg, i) =>
              msg.type === "system" ? (
                <p
                  key={i}
                  className="text-center text-xs text-slate-400 italic"
                >
                  {msg.message}
                </p>
              ) : (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.username === user.username ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs text-slate-400 mb-1">
                    {msg.username}
                  </span>
                  <div
                    className={`px-4 py-3 rounded-3xl text-sm max-w-[70%] ${
                      msg.username === user.username
                        ? "bg-sky-600 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ),
            )}
            <div ref={bottomRef} />
          </div>

          <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-slate-50 px-5 py-4">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message"
                className="flex-1 rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
              <button
                onClick={sendMessage}
                className="rounded-3xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Send
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
