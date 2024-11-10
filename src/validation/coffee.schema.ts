import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { coffees } from "../models/schema";

export const insertCoffeeSchema = createInsertSchema(coffees, {
  name: z.string().min(1).max(255),
});

export const selectCoffeeSchema = createSelectSchema(coffees);

export type InsertCoffee = z.infer<typeof insertCoffeeSchema>;
export type Coffee = z.infer<typeof selectCoffeeSchema>;
