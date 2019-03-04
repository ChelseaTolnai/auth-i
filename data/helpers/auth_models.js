const db = require('../dbConfig');

module.exports = {
    add: async function(user) {
        const [id] = await db('users').insert(user);
        return this.get(id);
    },
    get: function(id) {
        if(id) {
            return db('users').where({ id }).first();
        }
        return db('users').select('*')
    }
}