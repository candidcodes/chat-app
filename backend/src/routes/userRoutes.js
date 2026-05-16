const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { updateUser, deleteUser } = require("../controllers/userController");

router.put("/update", protect, updateUser);
router.delete("/delete", protect, deleteUser);

module.exports = router;
