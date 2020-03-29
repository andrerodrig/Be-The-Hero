const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');


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

/**
 * Tipos de parametros:
 * Query
 * Route
 * Body
 */

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

// Rotas para recurso /profile
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.list);

// Rotas para recurso /incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.list)

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


module.exports = routes;