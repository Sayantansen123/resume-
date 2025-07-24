import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const SECRET_KEY = "secretkey";

export const signupResolver = async (_, { input }) => {
  const { name, email, password, work } = input;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Save the new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    work,
  });

  await user.save();

  // 4. Generate JWT token
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "7d" });

  // 5. Return auth payload
  return {
    token,
    user,
  };
};
