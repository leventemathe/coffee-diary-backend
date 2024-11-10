import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { coffees } from "../models/schema";

export const roastLevelSchema = z.enum([
  "light_roast",
  "medium_roast",
  "dark_roast",
]);

export const roastProfileSchema = z.enum(["espresso", "filter", "moka"]);

export const insertCoffeeSchema = createInsertSchema(coffees, {
  name: z.string().min(1).max(255),
  roastLevel: roastLevelSchema,
  roastProfile: roastProfileSchema,
});

export const selectCoffeeSchema = createSelectSchema(coffees);

export type RoastLevel = z.infer<typeof roastLevelSchema>;
export type RoastProfile = z.infer<typeof roastProfileSchema>;

export type InsertCoffee = z.infer<typeof insertCoffeeSchema>;
export type Coffee = z.infer<typeof selectCoffeeSchema>;
