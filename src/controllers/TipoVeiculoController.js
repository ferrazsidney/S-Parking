const connection = require('../database/connection');
const { create } = require('./UsuarioController');

module.exports = {
    async index(request, response) {
        const tipoVeiculo = await connection('tipoveiculo').select('*');

        return response.json(tipoVeiculo);
    },

    async create(request, response) {
        const {tipoVeiculo} = request.body;
        
        const [tipoVeiculo_idTipoVeiculo] = await connection('tipoveiculo').insert({
            tipoVeiculo,
        });

        return response.json({tipoVeiculo_idTipoVeiculo})
    },

    async delete(request, response) {
        const { idTipoVeiculo } = request.params;
        const cpf = request.headers.authorization;

        const usuario = await connection('usuarios')
            .where('cpf', cpf)
            .select('superUsuario')
            .first();

        if (usuario.superUsuario != 1) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }

        const queryOk = await connection('tipoveiculo').where('idTipoVeiculo', idTipoVeiculo).delete();
        
        if(queryOk){
            return response.status(204).send();
        }
        return response.status(401).json({ error: 'Operation not permited.' });
    }
};