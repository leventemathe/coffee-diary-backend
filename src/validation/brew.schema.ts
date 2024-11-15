import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { brews } from "../models/schema";

export const insertBrewSchema = createInsertSchema(brews, {
  rating: z.number().min(1).max(5),
});

export const selectBrewSchema = createSelectSchema(brews);

export type InsertBrew = z.infer<typeof insertBrewSchema>;
export type Brew = z.infer<typeof selectBrewSchema>;
