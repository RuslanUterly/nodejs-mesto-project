import { Router } from 'express';
import { createUser, getUser, getUsers, updateUser, updateUserAvatar } from '../controllers/users';

export const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);
