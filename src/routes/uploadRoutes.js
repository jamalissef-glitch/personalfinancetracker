import express from "express";

import {
 uploadProfilePicture,
} from "../controllers/uploadController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/upload/profile-picture:
 *   post:
 *     summary: Upload a profile picture
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profilePicture
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture uploaded successfully
 *       400:
 *         description: Profile picture is required
 *       401:
 *         description: Authentication required
 */
router.post(
 "/profile-picture",
 protect,
 upload.single("profilePicture"),
 uploadProfilePicture,
);

export default router;