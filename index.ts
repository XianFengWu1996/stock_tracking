import './services/env';

import express from 'express';
import { ExpressApp } from './services/expressApp';

const startServer = async () => {
  const app = express();

  await ExpressApp(app);

  const server = app.listen(8000, () => {
    console.log('listening to port 8000');
  });

  // Handling Error
  process.on('unhandledRejection', (err) => {
    console.log(`An error occurred: ${(err as Error).message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
