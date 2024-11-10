import { Request, Response } from "express";
import { coffeeRepository } from "../repositories/coffee.repository";
import { insertCoffeeSchema } from "../validation/coffee.schema";
import { AppError } from "../middleware/error.middleware";

export class CoffeeController {
  async getCoffees(_: Request, res: Response) {
    const coffees = await coffeeRepository.findAll();
    res.json(coffees);
  }

  async createCoffee(req: Request, res: Response) {
    const validatedData = insertCoffeeSchema.parse(req.body);
    const coffee = await coffeeRepository.create(validatedData);
    res.status(201).json(coffee);
  }

  async deleteCoffee(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError(400, "Invalid ID");
    }

    const coffee = await coffeeRepository.findById(id);
    if (!coffee) {
      throw new AppError(404, "Coffee not found");
    }

    await coffeeRepository.delete(id);
    res.status(204).send();
  }
}

export const coffeeController = new CoffeeController();
