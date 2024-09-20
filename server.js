require ('dotenv').config()

const pool = require('./db/dbConnection')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

// Routes

app.get('/api/movies', async (req, res) => {
    try {
    const result = await pool.query('SELECT * FROM movies;')
    res.json(result.rows)
    } catch (err) {
        res.status(500).send('Error fetching movies')
    }
})






app.listen(PORT, () => console.log(`Movie API running on PORT ${PORT}`))
