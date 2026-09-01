import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdminOverview = async (req, res) => {
 const totalUsers = await User.countDocuments();

 const transactions = await Transaction.find().populate(
  "category",
  "name",
 );

 const spendingByCategory = {};

 transactions
  .filter((transaction) => transaction.type === "expense")
  .forEach((transaction) => {
   const categoryName = transaction.category?.name;

   if (!categoryName) return;

   if (!spendingByCategory[categoryName]) {
    spendingByCategory[categoryName] = 0;
   }

   spendingByCategory[categoryName] += transaction.amount;
  });

 const topSpendingCategories = Object.entries(spendingByCategory)
  .sort((a, b) => b[1] - a[1])
  .map(([category, amount]) => ({
   category,
   amount,
  }));

 res.status(200).json({
  success: true,
  overview: {
   totalUsers,
   topSpendingCategories,
  },
 });
};