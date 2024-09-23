let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4.1CW/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch all movie
const fetchAllMovies = async () => {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);
  return { movies: response };
};
app.get('/movies', async (req, res) => {
  let results = await fetchAllMovies();
  res.status(200).json(results);
});

//Exercise 2: Fetch all movies by genre

async function fetchMovieByGenre(genre) {
  let query = 'SELECT * FROM movies WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return { movies: response };
}

app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchMovieByGenre(genre);

  res.status(200).json(results);
});

//Exercise 3: Fetch movie details by ID
async function fetchMovieById(id) {
  let query = 'SELECT * FROM movies WHERE id = ?';
  let response = await db.get(query, [id]);

  return { movie: response };
}

app.get('/movies/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchMovieById(id);

  res.status(200).json(results);
});
//Exercise 4: Fetch movie details by release_year
async function fetchMovieByReleaseYear(release_year) {
  let query = 'SELECT * FROM movies WHERE release_year = ?';
  let response = await db.all(query, [release_year]);

  return { movie: response };
}

// endpoint: /movies/release_year/2019
app.get('/movies/release_year/:year', async (req, res) => {
  let release_year = req.params.year;
  let results = await fetchMovieByReleaseYear(release_year);

  res.status(200).json(results);
});
app.listen(PORT, () => console.log('server running on port 3000'));
