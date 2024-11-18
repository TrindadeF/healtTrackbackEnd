import { Request, Response, NextFunction } from "express";

export const validateData = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail: any) => detail.message);
      res.status(400).json({ errors });
      return;
    }

    next();
  };
};
