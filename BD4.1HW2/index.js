let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4.1HW2/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Retrieve All Tracks
async function fetchAllTracks() {
  let query = 'SELECT * FROM tracks';
  let response = await db.all(query, []);
  return { tracks: response };
}
app.get('/tracks', async (req, res) => {
  let results = await fetchAllTracks();
  res.status(200).json(results);
});

//Exercise 2: Retrieve Tracks by Artist
async function fetchTracksByArtist(artist) {
  let query = 'SELECT * FROM tracks WHERE artist = ?';
  let response = await db.all(query, [artist]);
  return { tracks: response };
}
app.get('/tracks/artist/:artist', async (req, res) => {
  let artist = req.params.artist;
  let results = await fetchTracksByArtist(artist);
  res.status(200).json(results);
});
//Exercise 3: Retrieve Tracks by Genre
async function fetchTracksByGenre(genre) {
  let query = 'SELECT * FROM tracks WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { tracks: response };
}
app.get('/tracks/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchTracksByGenre(genre);
  res.status(200).json(results);
});

//Exercise 4: Retrieve Tracks by Release Year
async function fetchTracksByReleaseYear(release_year) {
  let query = 'SELECT * FROM tracks WHERE release_year = ?';
  let response = await db.all(query, [release_year]);
  return { track: response };
}
app.get('/tracks/release_year/:year', async (req, res) => {
  let release_year = req.params.year;
  let results = await fetchTracksByReleaseYear(release_year);
  res.status(200).json(results);
});
app.listen(PORT, () => console.log('server running on port 3000'));
