import "dotenv/config";

import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import { defaultCategories } from "../data/defaultCategories.js";

const seedCategories = async () => {
 try {
  await connectDB();

  await Category.deleteMany({});

  await Category.insertMany(defaultCategories);

  console.log("Default categories seeded successfully.");

  process.exit(0);
 } catch (error) {
  console.error("Category seeding failed:", error.message);

  process.exit(1);
 }
};

seedCategories();