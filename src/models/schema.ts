import {
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

export const coffees = pgTable("coffees", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  region: varchar("region"),
  roastLevel: varchar("roast_level"),
  roastProfile: varchar("roast_profile"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const coffeemakers = pgTable("coffeemakers", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  type: varchar("type", {
    enum: [
      "espresso_maker",
      "pourover_maker",
      "immersion_maker",
      "drip_maker",
      "other_maker",
    ],
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const grinders = pgTable("grinders", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const brews = pgTable("brews", {
  id: serial("id").primaryKey(),
  coffeeId: serial("coffee_id").references(() => coffees.id),
  coffeeMakerId: serial("coffeemaker_id").references(() => coffeemakers.id),
  grinderId: serial("grinder_id").references(() => grinders.id),
  input: numeric("input").notNull(),
  output: numeric("output").notNull(),
  time: numeric("time").notNull(),
  grindSetting: numeric("grind_setting").notNull(),
  temperature: numeric("temperature"),
  pressure: numeric("pressure"),
  preInfusion: boolean("pre_infusion"),
  otherNotes: text("other_notes"),
  rating: numeric("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
