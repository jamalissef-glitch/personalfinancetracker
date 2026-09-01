import streamifier from "streamifier";

import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const uploadProfilePicture = async (req, res) => {
 if (!req.file) {
  return res.status(400).json({
   success: false,
   message: "Profile picture is required.",
  });
 }

 const uploadToCloudinary = () => {
  return new Promise((resolve, reject) => {
   const stream = cloudinary.uploader.upload_stream(
    {
     folder: "personal-finance-tracker/profile-pictures",
     resource_type: "image",
    },
    (error, result) => {
     if (error) {
      reject(error);
     } else {
      resolve(result);
     }
    },
   );

   streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
 };

 const result = await uploadToCloudinary();

 const user = await User.findByIdAndUpdate(
  req.user._id,
  {
   profilePicture: result.secure_url,
  },
  {
   new: true,
  },
 );

 res.status(200).json({
  success: true,
  message: "Profile picture uploaded successfully.",
  profilePicture: user.profilePicture,
 });
};