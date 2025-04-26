import {NextFunction, Request, Response} from "express";
import Card from "../models/card";
import {NotFoundError} from "../errors/not-found";
import {BadRequestError} from "../errors/bad-request";

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  const owner = req.user._id;

  return Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(error);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const cardId = req.params.cardId;

  return Card.findById(cardId)
    .orFail(new NotFoundError('Карточки не существует'))
    .then(() => Card.findByIdAndDelete(cardId))
    .then((cardInfo) => res.send(cardInfo))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(error);
      }
    });
};

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const owner = req.user._id;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточки не существует'))
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(error);
      }
    });
};

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const owner = req.user._id;

  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточки не существует'))
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(error)
      }
    });
};