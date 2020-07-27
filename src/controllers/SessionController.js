const { create } = require("./UsuarioController");

const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { cpf } = request.body;

        const usuario = await connection('usuarios')
            .where('cpf', cpf)
            .select('nome')
            .first();

        if (!usuario) {
            return response.status(400).json({ error: 'Usuário não encontrado!'});
        }

        return response.json(usuario);
    }
}