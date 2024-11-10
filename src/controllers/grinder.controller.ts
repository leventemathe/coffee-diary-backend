import { Request, Response } from "express";
import { grinderRepository } from "../repositories/grinder.repository";
import { AppError } from "../middleware/error.middleware";

export class GrinderController {
  async getGrinders(_: Request, res: Response) {
    const grinders = await grinderRepository.findAll();
    res.json(grinders);
  }

  async createGrinder(req: Request, res: Response) {
    const grinder = await grinderRepository.create(req.body);
    res.status(201).json(grinder);
  }

  async deleteGrinder(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError(400, "Invalid ID");
    }

    await grinderRepository.delete(id);
    res.status(204).send();
  }
}

export const grinderController = new GrinderController();
