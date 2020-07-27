const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const usuarios = await connection('usuarios').select('*');
    
        return response.json(usuarios);
    },

    async create(request, response) {
        const {cpf, nome, email, telefone, necessidadesEspeciais }  = request.body;

        await connection('usuarios').insert({
            cpf,
            nome,
            email,
            telefone,
            necessidadesEspeciais,
        })

        return response.json({ cpf });
    },     
};