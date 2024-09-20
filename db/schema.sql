DROP DATABASE IF EXISTS movies2_db;
CREATE DATABASE movies2_db;

\c movies2_db;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY NOT NULL,
    movie_name VARCHAR(100)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    review TEXT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
    ON DELETE SET NULL
);