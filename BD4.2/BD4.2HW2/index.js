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
    filename: './BD4.2/BD4.2HW2/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Exercise 1: Retrieve All Tracks
async function retriveAllTracks()
{
  let query = "SELECT * FROM tracks";
  let response = await db.all(query,[]);
  return { tracks : response};
}
app.get("/tracks",async(req,res)=>{
  try{
    let results = await retriveAllTracks();
    if(results.tracks.length === 0)
    {
return res.status(404).json({message: "not found any tracks"});
    }
    res.status(200).json(results);
  }catch(error){
    return res.status(500).json({error: error.message})
  }
})
//Exercise 2: Retrieve Tracks by Artist
async function getTracksByArtist(artist)
{
let query = "SELECT * FROM tracks WHERE artist = ?";
let response = await db.all(query,[artist]);
return {tracks:response};

}
app.get("/tracks/artist/:artist",async(req,res)=>{
 try{
  let artist = req.params.artist;
  let results = await getTracksByArtist(artist);
  if(results.tracks.length === 0)
  {
    return res.status(404).json({message: "track not found"});
  }
 res.status(200).json(results);
}catch(error){
  return res.status(500).json({error: error.message});
}
});
//Exercise 3: Retrieve Tracks by Genre

async function getTracksByGenre(genre)
{
  let query ="SELECT * FROM tracks WHERE genre= ?";
  let response = await db.all(query,[genre]);
  return {tracks:response};
}
app.get("/tracks/genre/:genre",async(req,res)=>{
  try{
  let genre = req.params.genre;
  let results = await getTracksByGenre(genre);
  if(results.tracks.length === 0)
  {
    return res.status(404).json({message: "tracks not found by this genre"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
})
//Exercise 4: Retrieve Tracks by Release Year
async function getTracksByReleaseYear(year)
{
  let query ="SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query,[year]);
  return {tracks: response};
}
app.get("/tracks/release_year/:year",async(req,res)=>{
  try{
  let year = req.params.year;
  let results = await getTracksByReleaseYear(year);
  if(results.tracks.length === 0)
  {
    return res.status(404).json({message:"not found any  this year tracks" });
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
});


app.listen(PORT, () => console.log('server running on port 3000'));