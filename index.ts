import './services/env';

import express from 'express';
import { ExpressApp } from './services/expressApp';

const startServer = async () => {
  const app = express();

  await ExpressApp(app);

  app.listen(8000, () => {
    console.log('listening to port 8000');
  });
};

startServer();
