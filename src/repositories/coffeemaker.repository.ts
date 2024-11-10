import { eq } from "drizzle-orm";
import { PostgresError } from "postgres";
import { db } from "../config/database";
import { coffeemakers } from "../models/schema";
import type {
  InsertCoffeemaker,
  Coffeemaker,
} from "../validation/coffeemaker.schema";
import { AppError } from "../middleware/error.middleware";

export class CoffeemakerRepository {
  async findAll(): Promise<Coffeemaker[]> {
    try {
      return await db.select().from(coffeemakers);
    } catch (error) {
      throw new AppError(500, "Failed to fetch coffeemakers");
    }
  }

  async findById(id: number): Promise<Coffeemaker> {
    try {
      const result = await db
        .select()
        .from(coffeemakers)
        .where(eq(coffeemakers.id, id));

      if (!result[0]) {
        throw new AppError(404, `Coffeemaker with id ${id} not found`);
      }

      return result[0];
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(500, `Failed to fetch coffeemaker with id ${id}`);
    }
  }

  async create(data: InsertCoffeemaker): Promise<Coffeemaker> {
    try {
      const result = await db.insert(coffeemakers).values(data).returning();
      return result[0];
    } catch (error) {
      if (error instanceof PostgresError && error.code === "23505") {
        throw new AppError(
          409,
          `Coffeemaker with name "${data.name}" already exists`
        );
      }
      throw new AppError(500, "Failed to create coffeemaker");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await db
        .delete(coffeemakers)
        .where(eq(coffeemakers.id, id))
        .returning({ id: coffeemakers.id });
    } catch (error) {
      throw new AppError(500, `Failed to delete coffeemaker with id ${id}`);
    }
  }
}

export const coffeemakerRepository = new CoffeemakerRepository();
