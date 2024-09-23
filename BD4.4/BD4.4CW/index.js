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
    filename: './BD4.4/BD4.4CW/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Exercise 1: SELECT only id, title & release_year of all movies
async function fetchAllMovies()
{
  let query = "SELECT id, title , release_year FROM movies";
  let response = await db.all(query,[]);
  return {movies:response};
}
app.get("/movies",async(req,res)=>{
  try{
    const results = await fetchAllMovies();
      if(results.movies.length === 0)
      {
        return res.status(404).json({message:"not found any movies"});
      }
   return  res.status(200).json(results);
  }catch(error){
   return  res.status(500).json({error:error.message});
  }
});
//Exercise 2: SELECT id, title, actor & release_year from all movies by an actor
async function fetchMoviesByActor(actor)
{
  let query = "SELECT id , title, actor ,release_year FROM movies WHERE actor = ? ";
  let response = await db.all(query,[actor])
  return {movies:response};
}
app.get("/movies/actor/:actor",async(req,res)=>{
  try{
  let actor = req.params.actor;
  let results = await fetchMoviesByActor(actor);
  if(results.movies.length === 0)
  {
    return res.status(404).json({message:"not found movie by actors"+actor});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})

//Exercise 3: SELECT id, title, director & release_year from all movies by a director
async function fetchMoviesByDirector(director)
{
  let query = "SELECT id , title, director ,release_year FROM movies WHERE director = ? ";
  let response = await db.all(query,[director])
  return {movies:response};
}
app.get("/movies/director/:director",async(req,res)=>{
  try{
  let director = req.params.director;
  let results = await fetchMoviesByDirector(director);
  if(results.movies.length === 0)
  {
    return res.status(404).json({message:"not found movie by director"+director});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})


app.listen(PORT, () => console.log('server running on port 3000'));