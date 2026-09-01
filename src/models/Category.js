import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
   trim: true,
   minlength: 2,
   maxlength: 50,
  },

  type: {
   type: String,
   enum: ["income", "expense"],
   required: true,
  },

  description: {
   type: String,
   trim: true,
   maxlength: 200,
   default: "",
  },

  isDefault: {
   type: Boolean,
   default: true,
  },
 },
 {
  timestamps: true,
 },
);

const Category = mongoose.model("Category", categorySchema);

export default Category;