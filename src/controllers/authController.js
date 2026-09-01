import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
 const { name, email, password } = req.body;

 const existingUser = await User.findOne({ email });

 if (existingUser) {
  return res.status(409).json({
   success: false,
   message: "Email is already registered.",
  });
 }

 const hashedPassword = await bcrypt.hash(password, 12);

 const user = await User.create({
  name,
  email,
  password: hashedPassword,
 });

 const token = generateToken(user._id);

 res.status(201).json({
  success: true,
  message: "Account created successfully.",
  token,
  user: {
   id: user._id,
   name: user.name,
   email: user.email,
   role: user.role,
   profilePicture: user.profilePicture,
  },
 });
};

export const login = async (req, res) => {
 const { email, password } = req.body;

 const user = await User.findOne({ email }).select("+password");

 if (!user) {
  return res.status(401).json({
   success: false,
   message: "Invalid email or password.",
  });
 }

 const isPasswordMatch = await bcrypt.compare(password, user.password);

 if (!isPasswordMatch) {
  return res.status(401).json({
   success: false,
   message: "Invalid email or password.",
  });
 }

 const token = generateToken(user._id);

 res.status(200).json({
  success: true,
  message: "Login successful.",
  token,
  user: {
   id: user._id,
   name: user.name,
   email: user.email,
   role: user.role,
   profilePicture: user.profilePicture,
  },
 });
};

export const getProfile = async (req, res) => {
 res.status(200).json({
  success: true,
  user: {
   id: req.user._id,
   name: req.user.name,
   email: req.user.email,
   role: req.user.role,
   profilePicture: req.user.profilePicture,
  },
 });
};