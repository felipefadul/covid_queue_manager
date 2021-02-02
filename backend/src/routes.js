const express = require('express');
//const db = require('./postgre/connection');

const routes = express.Router();

routes.get('/healthcheck', (_, res) => res.json({ alive: true } ));

module.exports = routes;