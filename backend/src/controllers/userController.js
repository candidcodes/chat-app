const User = require("../models/User");
const bcrypt = require("bcryptjs");

// PUT /api/users/update
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, password } = req.body;

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ message: "Profile updated", username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/users/delete
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { updateUser, deleteUser };
