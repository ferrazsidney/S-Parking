const { create, index } = require("./UsuarioController");
const connection = require('../database/connection');
const { where, offset } = require("../database/connection");

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count]  = await connection('veiculos').count();

        const veiculos = await connection('veiculos')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');
        response.header('X-Total-Count', count['count(*)']);

        return response.json(veiculos);
    },

    async create(request, response) {
        const { placa, marca, ano, modelo, cor, tipoVeiculo_idTipoVeiculo} = request.body;
        const usuarios_cpf = request.headers.authorization;

        const [veiculos_idVeiculos] = await connection('veiculos').insert({
            placa,
            marca,
            ano,
            modelo,
            cor,
            tipoVeiculo_idTipoVeiculo,
        });

        await connection('usuarios_has_veiculos').insert({
            usuarios_cpf,
            veiculos_idVeiculos,
        });

        return response.json({veiculos_idVeiculos});
    },

    async delete(request, response) {
        const { idVeiculo } = request.params;
        const cpf = request.headers.authorization;

        const veiculo = await connection('usuarios_has_veiculos')
            .where('veiculos_idVeiculos', idVeiculo)
            .select('usuarios_cpf')
            .first();

        if (veiculo.usuarios_cpf != cpf) {
            return response.status(401).json({ error: 'Operation not permited.' });
        }

        await connection('usuarios_has_veiculos').where('veiculos_idVeiculos', idVeiculo).delete();
        await connection('veiculos').where('idVeiculo', idVeiculo).delete();
        
        return response.status(204).send();
    },
};