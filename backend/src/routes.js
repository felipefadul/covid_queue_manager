const express = require('express');
const CadastroPaciente = require('./controllers/pacientes/cadastro');
const ConsultaPaciente = require('./controllers/pacientes/consulta');
const ChamarPaciente = require('./controllers/filas/chamar');

//const db = require('./postgre/connection');

const routes = express.Router();

routes.get('/api/healthcheck', (_, res) => res.json({ alive: true } ));
routes.post('/api/pacientes/cadastro', CadastroPaciente.cadastrarPaciente);
routes.post('/api/filas/chamar', ChamarPaciente.chamarPaciente);
routes.get('/api/pacientes/consulta/:paciente_id', ConsultaPaciente.recuperarPaciente);

module.exports = routes; 