import Transaction from "../models/Transaction.js";

// POST /api/transactions
// Create a new transaction
export const createTransaction = async (req, res) => {
 const { amount, type, category, description, date } = req.body;

 const transaction = await Transaction.create({
  user: req.user._id,
  amount,
  type,
  category,
  description,
  date,
 });

 res.status(201).json({
  success: true,
  message: "Transaction created successfully.",
  transaction,
 });
};

// GET /api/transactions
// Get all transactions for logged-in user
export const getTransactions = async (req, res) => {
 const transactions = await Transaction.find({
  user: req.user._id,
 }).sort({ date: -1 });

 res.status(200).json({
  success: true,
  transactions,
 });
};

// GET /api/transactions/monthly-summary
// Get income and expense summary by category
export const getMonthlySummary = async (req, res) => {
 const transactions = await Transaction.find({
  user: req.user._id,
 }).populate("category", "name");

 const summary = {};

 transactions.forEach((transaction) => {
  const categoryName = transaction.category?.name;

  if (!categoryName) return;

  if (!summary[categoryName]) {
   summary[categoryName] = {
    income: 0,
    expense: 0,
   };
  }

  if (transaction.type === "income") {
   summary[categoryName].income += transaction.amount;
  } else {
   summary[categoryName].expense += transaction.amount;
  }
 });

 res.status(200).json({
  success: true,
  summary,
 });
};

// PUT /api/transactions/:id
// Update a transaction
export const updateTransaction = async (req, res) => {
 const transaction = await Transaction.findOneAndUpdate(
  {
   _id: req.params.id,
   user: req.user._id,
  },
  req.body,
  {
   new: true,
   runValidators: true,
  },
 );

 if (!transaction) {
  return res.status(404).json({
   success: false,
   message: "Transaction not found.",
  });
 }

 res.status(200).json({
  success: true,
  message: "Transaction updated successfully.",
  transaction,
 });
};

// DELETE /api/transactions/:id
// Delete a transaction
export const deleteTransaction = async (req, res) => {
 const transaction = await Transaction.findOneAndDelete({
  _id: req.params.id,
  user: req.user._id,
 });

 if (!transaction) {
  return res.status(404).json({
   success: false,
   message: "Transaction not found.",
  });
 }

 res.status(200).json({
  success: true,
  message: "Transaction deleted successfully.",
 });
};