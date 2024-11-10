import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";
import { db } from "../config/database";
import { grinders } from "../models/schema";
import type { InsertGrinder, Grinder } from "../validation/grinder.schema";
import { AppError } from "../middleware/error.middleware";

export class GrinderRepository {
  async findAll(): Promise<Grinder[]> {
    try {
      return await db.select().from(grinders);
    } catch (error) {
      throw new AppError(500, "Failed to fetch grinders");
    }
  }

  async findById(id: number): Promise<Grinder> {
    try {
      const result = await db
        .select()
        .from(grinders)
        .where(eq(grinders.id, id));

      if (!result[0]) {
        throw new AppError(404, `Grinder with id ${id} not found`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, `Failed to fetch grinder with id ${id}`);
    }
  }

  async create(data: InsertGrinder): Promise<Grinder> {
    try {
      const result = await db.insert(grinders).values(data).returning();
      return result[0];
    } catch (error) {
      if (error instanceof PostgresError && error.code === "23505") {
        throw new AppError(
          409,
          `Grinder with name "${data.name}" already exists`,
        );
      }
      throw new AppError(500, "Failed to create grinder");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await db
        .delete(grinders)
        .where(eq(grinders.id, id))
        .returning({ id: grinders.id });
    } catch (error) {
      throw new AppError(500, `Failed to delete grinder with id ${id}`);
    }
  }
}

export const grinderRepository = new GrinderRepository();
