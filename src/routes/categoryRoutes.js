import express from "express";

import {
 getCategories,
} from "../controllers/categoryController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories returned successfully
 *       401:
 *         description: Authentication required
 */
router.get("/", protect, getCategories);

export default router;