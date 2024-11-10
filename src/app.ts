/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import { sql } from "drizzle-orm";
import { env } from "./config/env";
import { coffeeRouter } from "./routes/coffee.routes";
import { coffeemakerRouter } from "./routes/coffeemaker.routes";
import { errorHandler } from "./middleware/error.middleware";
import { grinderRouter } from "./routes/grinder.routes";
import { db } from "./config/database";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/coffee", coffeeRouter);
app.use("/api/v1/coffeemaker", coffeemakerRouter);
app.use("/api/v1/grinder", grinderRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    // Simple query to test connection
    await db.execute(sql`SELECT 1`);
    console.log("Database connection established");

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}...`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
