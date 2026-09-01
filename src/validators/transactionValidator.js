import { z } from "zod";

export const createTransactionSchema = z.object({
 amount: z.coerce
  .number()
  .positive("Amount must be greater than 0"),

 type: z.enum(["income", "expense"]),

 category: z
  .string()
  .trim()
  .min(1, "Category is required"),

 description: z
  .string()
  .trim()
  .max(500, "Description is too long")
  .optional()
  .default(""),

 date: z.coerce.date().optional(),
});

export const updateTransactionSchema = z.object({
 amount: z.coerce
  .number()
  .positive("Amount must be greater than 0")
  .optional(),

 type: z
  .enum(["income", "expense"])
  .optional(),

 category: z
  .string()
  .trim()
  .min(1, "Category is required")
  .optional(),

 description: z
  .string()
  .trim()
  .max(500, "Description is too long")
  .optional(),

 date: z.coerce.date().optional(),
});