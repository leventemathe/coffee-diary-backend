import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { grinders } from "../models/schema";

export const insertGrinderSchema = createInsertSchema(grinders, {
  name: z.string().min(1).max(255),
});

export const selectGrinderSchema = createSelectSchema(grinders);

export type InsertGrinder = z.infer<typeof insertGrinderSchema>;
export type Grinder = z.infer<typeof selectGrinderSchema>;
