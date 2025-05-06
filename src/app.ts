import express, { Express } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import { usersRouter } from './routes/users';
import { cardsRouter } from './routes/cards';
import { errorHandler } from './middlewares/error-handler';
import { auth } from './middlewares/auth';
import { notFoundHandler } from './middlewares/not-found-handler';
import { createUser, loginUser } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import { userSignInValidate, userSignUpValidate } from './middlewares/validator';

const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;

const startServer = () => {
  const app: Express = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(requestLogger);

  app.use(cookieParser());

  app.post('/signup', userSignUpValidate, createUser);
  app.post('/signin', userSignInValidate, loginUser);

  app.use(auth);

  app.use('/users', usersRouter);
  app.use('/cards', cardsRouter);

  app.use(notFoundHandler);
  app.use(errorLogger);
  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  startServer();
});
