import { Request, Response } from "express";
import { coffeeRepository } from "../repositories/coffee.repository";
import { AppError } from "../middleware/error.middleware";

export class CoffeeController {
  async getCoffees(_: Request, res: Response) {
    const coffees = await coffeeRepository.findAll();
    res.json(coffees);
  }

  async createCoffee(req: Request, res: Response) {
    const coffee = await coffeeRepository.create(req.body);
    res.status(201).json(coffee);
  }

  async deleteCoffee(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError(400, "Invalid ID");
    }

    await coffeeRepository.delete(id);
    res.status(204).send();
  }
}

export const coffeeController = new CoffeeController();
