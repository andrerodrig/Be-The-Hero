const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileControler');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Login do usuario. Usa o método POST pois queremos
// 'criar' uma sessão.
routes.post('/sessions', SessionController.create);


// Rotas para recurso /ongs
routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

// Rotas para recurso /profile
routes.get('/profile', ProfileController.list);

// Rotas para recurso /incidents
routes.get('/incidents', IncidentController.list)
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;