import axios from 'axios';

import { config } from 'dotenv';
import { join } from'path';
import { ok } from 'assert';

const env = process.env.NODE_ENV || "development"; // Por default, é "development".
ok(env === "production" || env === "development", 'A env é inválida! Deve ser "production" ou "development"');

const configPath = join(__dirname, '../../', `.env.${env}`);
config({
  path: configPath
});

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST}:3333`,
})

export default api;