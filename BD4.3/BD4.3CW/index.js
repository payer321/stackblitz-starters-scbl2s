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
    filename: './BD4.3/BD4.3CW/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Question 1: Fetch All Movies
async function fetchAllMovies()
{
  let query = "SELECT * FROM movies";
  let response = await db.all(query,[]);
  return {movies:response}
}
app.get("/movies",async(req,res)=>{
 try{
  let results = await fetchAllMovies();
  if(results.movies.length === 0)
  {
    return res.status(404).json({message:"no movies found"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Question 2: Fetch All Movies by Actor
async function filterByActor(actor)
{
  let query = "SELECT * FROM movies WHERE actor = ?";
  let response = await db.all(query,[actor]);
  return {movies : response}
}
app.get("/movies/actor/:actor",async(req,res)=>{
  try{
  let actor = req.params.actor;
  let results = await filterByActor(actor);
  if(results.movies.length === 0)
  {
    return res.status(404).json({message:"no actor found"+actor});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Question 3: Fetch All Movies by Director
async function filterByDirector(director)
{
  let query = "SELECT * FROM movies WHERE director = ?";
  let response = await db.all(query,[director]);
  return {movies:response}
}
app.get("/movies/director/:director",async(req,res)=>{
  try{
  let director = req.params.director;
  let results = await filterByDirector(director);
  if(results.movies.length === 0)
  {
    return res.status(404).json({message:"not found director name"+director});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({eror:error.message});
}
})

app.listen(PORT, () => console.log('server running on port 3000'));