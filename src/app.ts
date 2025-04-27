import express, { Express } from 'express';
import mongoose from 'mongoose';
import { usersRouter } from './routes/users';
import { cardsRouter } from './routes/cards';
import { authHandler } from './middlewares/auth-handler';
import { errorHandler } from './middlewares/error-handler';
import { notFoundHandler } from './middlewares/not-found-handler';

const { PORT = 3000 } = process.env;

const startServer = () => {
  const app: Express = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(authHandler);

  app.use('/users', usersRouter);
  app.use('/cards', cardsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  startServer();
});
