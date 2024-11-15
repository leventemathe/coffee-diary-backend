import { Request, Response } from "express";
import { brewRepository } from "../repositories/brew.repository";
import { AppError } from "../middleware/error.middleware";

export class BrewController {
  async getBrews(_: Request, res: Response) {
    const brews = await brewRepository.findAll();
    res.json(brews);
  }

  async createBrew(req: Request, res: Response) {
    const brew = await brewRepository.create(req.body);
    res.status(201).json(brew);
  }

  async deleteBrew(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      throw new AppError(400, "Invalid ID");
    }

    await brewRepository.delete(id);
    res.status(204).send();
  }
}

export const brewController = new BrewController();
