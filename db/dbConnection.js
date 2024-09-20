const { Pool } = require('pg')

const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
})

pool.query('SELECT NOW()')
    .then(result => console.log(result))
    .catch(err => console.log(err))



module.exports = pool