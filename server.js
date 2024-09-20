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

app.get('/api/movie-reviews', async (req, res) => {
    try {
    const result = await pool.query(`
        SELECT * FROM movies 
        JOIN reviews
        ON movies.id = reviews.movie_id;`)
    res.json(result.rows)
    } catch (err) {
        res.status(500).send('Error fetching movies')
    }
})

app.post('/api/add-movie', async (req, res) => {
    console.log(req.body)
    const { movie_name } = req.body

    if (!movie_name) {
        return res.status(400).send('We need a movie name')
    }

    try {
    const result = await pool.query(`
        INSERT INTO movies (movie_name)
        VALUES ($1);
        `, [movie_name])
    res.json(result.rowCount)
    } catch (err) {
        res.status(500).send('Error adding movie')
    }
})


app.delete('/api/movie/:id', async (req, res) => {

    const { id } = req.params


    try {
    const result = await pool.query(`DELETE FROM movies WHERE id = $1;`, [id])
     
    res.json(result.rowCount)
    } catch (err) {
        res.status(500).send('Error deleting movie')
    }
})





app.listen(PORT, () => console.log(`Movie API running on PORT ${PORT}`))
