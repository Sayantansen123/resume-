import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET_KEY = "secretkey";

export const signupResolver = async (_, { input }) => {
  const { name, email, password, work } = input;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    work,
  });

  await user.save();

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "7d" });

  // Return auth payload
  return {
    token,
    user,
  };
};
