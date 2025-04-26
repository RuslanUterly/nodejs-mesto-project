import {Router} from "express";
import {createCard, deleteCard, dislikeCard, getCards, likeCard} from "../controllers/cards";

export const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);