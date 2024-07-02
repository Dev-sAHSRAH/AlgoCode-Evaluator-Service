import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          ...req.body,
        });
        next();
      } catch (error) {
        //   console.log(error);
        res.status(400).json({
          success: false,
          message: "Invalid request params received",
          data : {},
          error
        });
      }
    };
