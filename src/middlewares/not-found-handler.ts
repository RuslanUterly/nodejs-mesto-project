import { RequestHandler } from 'express';
import { NotFoundError } from '../errors/not-found';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new NotFoundError('Not found'));
};
