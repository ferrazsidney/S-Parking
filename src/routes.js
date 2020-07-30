const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');
const VeiculoController = require('./controllers/VeiculoController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const TipoVeiculoController = require('./controllers/TipoVeiculoController');

const routes = express.Router();

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.create);

routes.get('/veiculo', VeiculoController.index);
routes.post('/veiculo', VeiculoController.create);
routes.delete('/veiculo/:idVeiculo', VeiculoController.delete);

routes.get('/tipoVeiculo', TipoVeiculoController.index);
routes.post('/tipoVeiculo', TipoVeiculoController.create);
routes.delete('/tipoVeiculo/:idTipoVeiculo', TipoVeiculoController.delete);

module.exports = routes;