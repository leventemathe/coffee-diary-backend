import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { AppError } from "./error.middleware";

export const validateRequest =
  (schemas: {
    body?: AnyZodObject;
    query?: AnyZodObject;
    params?: AnyZodObject;
  }) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      next(new AppError(400, "Validation error"));
    }
  };
