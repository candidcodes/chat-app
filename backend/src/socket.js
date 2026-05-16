const Message = require("./models/Message");

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins
    socket.on("user_join", (username) => {
      socket.username = username;
      io.emit("user_join", `${username} joined the chat`);
    });

    // User sends message
    socket.on("send_message", async ({ username, message }) => {
      try {
        // Save to DB
        await Message.create({ username, message });

        // Broadcast to everyone
        io.emit("receive_message", { username, message });
      } catch (err) {
        console.error("Message save error:", err.message);
      }
    });

    // User disconnects
    socket.on("disconnect", () => {
      if (socket.username) {
        io.emit("user_left", `${socket.username} left the chat`);
      }
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = initSocket;
