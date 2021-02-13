const express = require('express');
const CadastroPaciente = require('./controllers/pacientes/cadastro');
const ConsultaPaciente = require('./controllers/pacientes/consulta');

//const db = require('./postgre/connection');

const routes = express.Router();

routes.get('/api/healthcheck', (_, res) => res.json({ alive: true } ));
routes.post('/api/pacientes/cadastro', CadastroPaciente.cadastrarPaciente);

module.exports = routes; 