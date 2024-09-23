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
    filename: './BD4.4/BD4.4HW2/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Artworks
async function fetchAllArtworks()
{
  let query = "SELECT id, title , artist FROM artworks";
  let response = await db.all(query,[]);
  return{artworks:response};
}
app.get("/artworks",async(req,res)=>{
 try{
  let results = await fetchAllArtworks();
  if(results.artworks.length === 0)
  {
    return res.status(404).json({message:"not found any records"});
  }
  return  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 2: Fetch Artworks by Artist
async function fetchArtworksByArtist(artist)
{
  let query = "SELECT id,title,artist,year FROM artworks WHERE artist = ? ";
  let response = await db.all(query,[artist]);
  return{artworks : response};
}
app.get("/artworks/artist/:artist",async(req,res)=>{
 try{
  let artist = req.params.artist;
  let results = await fetchArtworksByArtist(artist);
  if(results.artworks.length === 0)
  {
    return res.status(404).json({message:"not found artworks by artist"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});

//Exercise 3: Fetch Artworks by Year
async function fetchArtworksByYear(year)
{
  let query = "SELECT id,title,artist,year FROM artworks WHERE year = ?";
  let response = await db.all(query,[year]);
  return{artworks:response};
}
app.get("/artworks/year/:year",async(req,res)=>{
  try{
  let year = req.params.year;
  let results = await fetchArtworksByYear(year);
  if(results.artworks.length === 0)
  {
    return status(404).json({message:"not found artworks by year"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 4: Fetch Artworks by Medium
async function fetchArtworksByMedium(medium)
{
  let query = "SELECT id,title,artist,medium FROM artworks WHERE medium = ?";
  let response = await db.all(query,[medium]);
  return {artworks:response};
}
app.get("/artworks/medium/:medium",async(req,res)=>{
 try{
  let medium = req.params.medium;
  let results = await fetchArtworksByMedium(medium);
  if(results.artworks.length === 0)
  {
    return res.status(404).json({message:"not found artworks by medium"+medium});
  }
  return res.status(200).json(results)
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
app.listen(PORT, () => console.log('server running on port 3000'));