import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '../config/config';
import { NotFoundError, errorHandler } from '../errors';

export const ExpressApp = async (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ config: config() });
    } catch (error) {
      next(error);
    }
  });

  app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    try {
      // if some thing
      throw new Error('generic error');
      res.json('up and running');
    } catch (error) {
      next(error);
    }
  });

  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError();
    next(error);
  });

  app.use(errorHandler);

  return app;
};
