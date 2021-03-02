import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

export const config = {
  PORT: process.env.PORT || 5666,
  NODE_ENV: process.env.NODE_ENV,

  OPENPIX_API: process.env.OPENPIX_API,
  APP_ID: process.env.APP_ID,
  MONGO_URI: process.env.MONGO_URI,
}
