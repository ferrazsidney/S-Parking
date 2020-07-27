const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const VeiculoController = require('./controllers/VeiculoController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

routes.post('/usuario', UsuarioController.create);
routes.get('/usuario', UsuarioController.index);

routes.post('/veiculo', VeiculoController.create);
routes.get('/veiculo', VeiculoController.index);
routes.delete('/veiculo/:idVeiculo', VeiculoController.delete);

module.exports = routes;