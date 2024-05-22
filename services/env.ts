import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'local';

dotenv.config({ path: path.resolve(__dirname, '../', `.env.${env}`) });
