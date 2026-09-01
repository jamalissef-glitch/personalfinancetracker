import express from "express";

import {
 getAdminOverview,
} from "../controllers/adminController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/admin/overview:
 *   get:
 *     summary: Get admin overview
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin overview returned successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
 "/overview",
 protect,
 adminOnly,
 getAdminOverview,
);

export default router;