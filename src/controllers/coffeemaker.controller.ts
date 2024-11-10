import { Request, Response } from "express";
import { coffeemakerRepository } from "../repositories/coffeemaker.repository";
import { AppError } from "../middleware/error.middleware";

export class CoffeemakerController {
  async getCoffeemakers(_: Request, res: Response) {
    const coffeemakers = await coffeemakerRepository.findAll();
    res.json(coffeemakers);
  }

  async createCoffeemaker(req: Request, res: Response) {
    const coffeemaker = await coffeemakerRepository.create(req.body);
    res.status(201).json(coffeemaker);
  }

  async deleteCoffeemaker(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError(400, "Invalid ID");
    }

    await coffeemakerRepository.delete(id);
    res.status(204).send();
  }
}

export const coffeemakerController = new CoffeemakerController();
