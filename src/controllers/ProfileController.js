const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const cpf = request.headers.authorization;

        const veiculos = await connection('usuarios_has_veiculos').join('veiculos',
            'usuarios_has_veiculos.veiculos_idVeiculos', '=', 'veiculos.idVeiculo')
                .where('usuarios_cpf', cpf)
                .select('usuarios_cpf', 'placa');

        return response.json(veiculos);
    }
}