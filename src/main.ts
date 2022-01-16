import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

import runServer from './app';
import config from './config';

createConnection().then(async (_) => {
  runServer(config.server.port);
});
