import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const logoutResolver = async (_, { input }) => {
  // Verify the token
  try {
    const { token } = input;
    const decoded = jwt.verify(token, "secretkey");
    // Find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }
    return {
      message: "User logged out successfully",
    };
  } catch (error) {
    throw new Error("Invalid token");
  }
};
