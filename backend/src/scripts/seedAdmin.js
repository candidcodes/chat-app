const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");
const dotenv   = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const User = require("../models/User");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const exists = await User.findOne({ email: "admin@test.com" });
    if (exists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashed = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "admin",
      email:    "admin@test.com",
      password: hashed,
      role:     "admin",
    });

    console.log("Admin created:");
    console.log("  email:    admin@test.com");
    console.log("  password: admin123");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
};

seedAdmin();