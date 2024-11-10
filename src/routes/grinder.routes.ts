import { Router } from "express";
import { grinderController } from "../controllers/grinder.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { insertGrinderSchema } from "../validation/grinder.schema";

export const grinderRouter = Router();

grinderRouter
  .get("/", grinderController.getGrinders)
  .post(
    "/",
    validateRequest({ body: insertGrinderSchema }),
    grinderController.createGrinder,
  )
  .delete("/:id", grinderController.deleteGrinder);
