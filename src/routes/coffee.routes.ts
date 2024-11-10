import { Router } from "express";
import { coffeeController } from "../controllers/coffee.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { insertCoffeeSchema } from "../validation/coffee.schema";

export const coffeeRouter = Router();

coffeeRouter
  .get("/", coffeeController.getCoffees)
  .post(
    "/",
    validateRequest({ body: insertCoffeeSchema }),
    coffeeController.createCoffee,
  )
  .delete("/:id", coffeeController.deleteCoffee);
