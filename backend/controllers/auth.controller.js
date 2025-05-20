import User from "../models/user.model.js"; // Adjust path as needed
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const { password: pwd, ...rest } = user._doc;

    res
      .status(201)
      .json({ message: "Account created successfully", user: rest });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create account!", error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { password: pwd, ...rest } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ success: true, message: "Login successful", user: rest });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

export const logout = (_, res) => {
  res
    .clearCookie("token", {
      sameSite: "Strict",
      // secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};
