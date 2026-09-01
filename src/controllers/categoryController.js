import Category from "../models/Category.js";

export const getCategories = async (req, res) => {
 const categories = await Category.find().sort({ name: 1 });

 res.status(200).json({
  success: true,
  count: categories.length,
  categories,
 });
};