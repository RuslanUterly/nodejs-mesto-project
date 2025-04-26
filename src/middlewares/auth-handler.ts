import {NextFunction, Request, Response} from "express";

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '680bed4444b0636aa03679ee'
  };

  next();
};