const express = require('express');
const CadastroPaciente = require('./controllers/pacientes/cadastro');
const ConsultaPaciente = require('./controllers/pacientes/consulta');
const ChamarPaciente = require('./controllers/filas/chamar');
const ConsultaHistorico = require('./controllers/historico/consulta');

//const db = require('./postgre/connection');

const routes = express.Router();

routes.get('/api/healthcheck', (_, res) => res.json({ alive: true } ));
routes.post('/api/pacientes/cadastro', CadastroPaciente.cadastrarPaciente);
routes.post('/api/filas/chamar', ChamarPaciente.chamarPaciente);
routes.get('/api/pacientes/consulta/:paciente_id', ConsultaPaciente.recuperarPaciente);
routes.get('/api/historico/consulta/:visibilidade', ConsultaHistorico.recuperarHistorico);

module.exports = routes; 