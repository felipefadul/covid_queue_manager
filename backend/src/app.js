const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const env = process.env.NODE_ENV || "dev"; // Por default, é "dev".
ok(env === "prod" || env === "dev", 'A env é inválida! Deve ser "prod" ou "dev"');

const configPath = join(__dirname, './config', `.env.${env}`);
config({
  path: configPath
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', function (req, res) { //endereco da requisicao onde e retornado hello world
  res.send('Hello World')
})

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
  console.log(`Servidor rodando na porta ${SERVER_PORT}! :D`);
}); //execucao do servidor
