import { Router } from "express";
import { brewController } from "../controllers/brew.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { insertBrewSchema } from "../validation/brew.schema";

export const brewRouter = Router();

brewRouter
  .get("/", brewController.getBrews)
  .post(
    "/",
    validateRequest({ body: insertBrewSchema }),
    brewController.createBrew,
  )
  .delete("/:id", brewController.deleteBrew);
