import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/unauthorized';

const jwt = require('jsonwebtoken');

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Токен отсутствует, необходима авторизация'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'key');
  } catch {
    next(new UnauthorizedError('Вы не авторизованы'));
    return;
  }
  req.user = payload;

  next();
};
