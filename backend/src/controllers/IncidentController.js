const connection = require('../database/connection');


module.exports = {

    // Lista todos os Casos
    async list(request, response) {
        const { page = 1} = request.query;
        
        // Resulta no mesmo que [total], ou total[0]
        const [total] = await connection('incidents').count();

        console.log(total);

        const incidents = await connection('incidents')
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ])
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5);

            response.header('X-Total-Count', total['count(*)']);

        return response.json(incidents);
    },

    //Cria um novo Caso
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    // Deleta um Caso
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' });
        }
        
        await connection('incidents').where('id', id).delete();
        
        return response.status(204).send();
    }
};