import { NextFunction, Request, Response } from "express";
import { validationPipe } from "../utility/validation";

export const validationMiddleware =
  (validationSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
      ...req.query,
    });

    if (result["errors"]) {
      return res.status(400).json({
        success: false,
        ...(result as any),
      });
    }

    next();
    return true;
  };
