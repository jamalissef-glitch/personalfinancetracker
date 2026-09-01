import express from "express";

import {
 createTransaction,
 getTransactions,
 getMonthlySummary,
 updateTransaction,
 deleteTransaction,
} from "../controllers/transactionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Invalid transaction data
 *       401:
 *         description: Authentication required
 */
router.post("/", createTransaction);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions returned successfully
 *       401:
 *         description: Authentication required
 */
router.get("/", getTransactions);

/**
 * @swagger
 * /api/transactions/monthly-summary:
 *   get:
 *     summary: Get income and expense summary
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly summary returned successfully
 *       401:
 *         description: Authentication required
 */
router.get("/monthly-summary", getMonthlySummary);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68b123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Authentication required
 */
router.put("/:id", updateTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68b123456789abcdef123456
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Authentication required
 */
router.delete("/:id", deleteTransaction);

export default router;