import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { coffeemakers } from "../models/schema";

export const coffeemakerTypeSchema = z.enum([
  "espresso_maker",
  "pourover_maker",
  "immersion_maker",
  "drip_maker",
  "other_maker",
]);

export const insertCoffeemakerSchema = createInsertSchema(coffeemakers, {
  name: z.string().min(1).max(255),
  type: coffeemakerTypeSchema,
});

export const selectCoffeemakerSchema = createSelectSchema(coffeemakers);

export type CoffeemakerType = z.infer<typeof coffeemakerTypeSchema>;

export type InsertCoffeemaker = z.infer<typeof insertCoffeemakerSchema>;
export type Coffeemaker = z.infer<typeof selectCoffeemakerSchema>;
