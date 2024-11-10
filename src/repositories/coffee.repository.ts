import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";
import { db } from "../config/database";
import { coffees } from "../models/schema";
import type { InsertCoffee, Coffee } from "../validation/coffee.schema";
import { AppError } from "../middleware/error.middleware";

export class CoffeeRepository {
  async findAll(): Promise<Coffee[]> {
    try {
      return await db.select().from(coffees);
    } catch (error) {
      throw new AppError(500, "Failed to fetch coffees");
    }
  }

  async findById(id: number): Promise<Coffee> {
    try {
      const result = await db.select().from(coffees).where(eq(coffees.id, id));

      if (!result[0]) {
        throw new AppError(404, `Coffee with id ${id} not found`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, `Failed to fetch coffee with id ${id}`);
    }
  }

  async create(data: InsertCoffee): Promise<Coffee> {
    try {
      const result = await db.insert(coffees).values(data).returning();
      return result[0];
    } catch (error) {
      // PostgreSQL unique constraint violation code
      if (error instanceof PostgresError && error.code === "23505") {
        throw new AppError(
          409,
          `Coffee with name "${data.name}" already exists`,
        );
      }
      throw new AppError(500, "Failed to create coffee");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await db
        .delete(coffees)
        .where(eq(coffees.id, id))
        .returning({ id: coffees.id });
    } catch (error) {
      throw new AppError(500, `Failed to delete coffee with id ${id}`);
    }
  }
}

export const coffeeRepository = new CoffeeRepository();
