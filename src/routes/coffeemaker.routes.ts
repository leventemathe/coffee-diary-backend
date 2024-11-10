import { Router } from "express";
import { coffeemakerController } from "../controllers/coffeemaker.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { insertCoffeemakerSchema } from "../validation/coffeemaker.schema";

export const coffeemakerRouter = Router();

coffeemakerRouter
  .get("/", coffeemakerController.getCoffeemakers)
  .post(
    "/",
    validateRequest({ body: insertCoffeemakerSchema }),
    coffeemakerController.createCoffeemaker,
  )
  .delete("/:id", coffeemakerController.deleteCoffeemaker);
