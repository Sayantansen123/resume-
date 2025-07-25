import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET_KEY = "secretkey";

export const loginResolver = async (_, { input }) => {
  const { email, password } = input;

  //check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }
  //check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "7d" });

  // Return auth payload
  return {
    token,
    user,
  };
};
