import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";
import { db } from "../config/database";
import { brews } from "../models/schema";
import type { InsertBrew, Brew } from "../validation/brew.schema";
import { AppError } from "../middleware/error.middleware";

export class BrewRepository {
  async findAll(): Promise<Brew[]> {
    try {
      return await db.select().from(brews);
    } catch (error) {
      throw new AppError(500, "Failed to fetch brews");
    }
  }

  async findById(id: number): Promise<Brew> {
    try {
      const result = await db.select().from(brews).where(eq(brews.id, id));

      if (!result[0]) {
        throw new AppError(404, `Brew with id ${id} not found`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, `Failed to fetch brew with id ${id}`);
    }
  }

  async create(data: InsertBrew): Promise<Brew> {
    try {
      const result = await db.insert(brews).values(data).returning();
      return result[0];
    } catch (error) {
      if (error instanceof PostgresError && error.code === "23503") {
        throw new AppError(
          400,
          "Referenced coffee, coffeemaker, or grinder not found",
        );
      }
      throw new AppError(500, "Failed to create brew");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await db
        .delete(brews)
        .where(eq(brews.id, id))
        .returning({ id: brews.id });
    } catch (error) {
      throw new AppError(500, `Failed to delete brew with id ${id}`);
    }
  }
}

export const brewRepository = new BrewRepository();
