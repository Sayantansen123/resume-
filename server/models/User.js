import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    work: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a model from the schema
const User = mongoose.model("User", userSchema);
export default User;
