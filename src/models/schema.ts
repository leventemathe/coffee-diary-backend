import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  varchar,
  integer,
  real,
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
  type: varchar("type").notNull(),
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
  coffeeId: integer("coffee_id")
    .notNull()
    .references(() => coffees.id),
  coffeemakerId: integer("coffeemaker_id")
    .notNull()
    .references(() => coffeemakers.id),
  grinderId: integer("grinder_id")
    .notNull()
    .references(() => grinders.id),
  input: real("input").notNull(),
  output: real("output").notNull(),
  time: real("time").notNull(),
  grindSetting: varchar("grind_setting").notNull(),
  temperature: real("temperature"),
  pressure: real("pressure"),
  preInfusion: boolean("pre_infusion"),
  otherNotes: text("other_notes"),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
