const db = require('../dbConfig');

module.exports = {
    add: async function(user) {
        const [id] = await db('users').insert(user);
        return this.getBy({ id });
    },
    getBy: function(filter) {
        if(filter) {
            return db('users').where(filter).first();
        }
        return db('users').select('*')
    },
}