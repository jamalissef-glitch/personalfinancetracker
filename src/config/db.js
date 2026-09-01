import mongoose from "mongoose";

const connectDB = async () => {
 try {
  const mongoURI =
   process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PRO
    : process.env.MONGO_URI_DEV;

  if (!mongoURI) {
   throw new Error("MongoDB connection URI is missing.");
  }

  const conn = await mongoose.connect(mongoURI);

  console.log(`MongoDB connected: ${conn.connection.host}`);
 } catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
 }
};

export default connectDB;