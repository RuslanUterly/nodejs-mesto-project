import { Router } from 'express';
import { getActiveUser, getUser, getUsers, updateUser, updateUserAvatar } from '../controllers/users';
import { userIdValidate, userUpdateAvatarValidate, userUpdateValidate } from '../middlewares/validator';

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getActiveUser);
usersRouter.get('/:userId', userIdValidate, getUser);
usersRouter.patch('/me', userUpdateValidate, updateUser);
usersRouter.patch('/me/avatar', userUpdateAvatarValidate, updateUserAvatar);
