let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let {open}=require("sqlite");

let app = express();
  let PORT = process.env.PORT || 3000;
  app.use(cors());
  app.use(express.json());
  let db;
  (async () =>{
    db = await open({
      filename: './BD4.3/BD4.3HW2/database.sqlite',
      driver: sqlite3.Database,
    })
  })();
  //Exercise 1: Fetch All Recipes by Cuisine
  async function filterByCuisine(cuisine)
{
  let query ="SELECT * FROM recipes WHERE cuisine = ?";
  let response = await db.all(query,[cuisine]);
  return {recipes: response};

}
app.get("/recipes/cuisine/:cuisine",async(req,res)=>{
  try{
  let cuisine = req.params.cuisine;
  let results = await filterByCuisine(cuisine);
  if(results.recipes.length === 0)
  {
    return res.status(404).json({message:"not found recipes by cuisine "+cuisine});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 2: Fetch All Recipes by Main Ingredient
async function filterByMainIngredient(main_ingredient)
{
  let query= "SELECT * FROM recipes WHERE main_ingredient = ?";
  let response = await db.all(query,[main_ingredient]);
  return {recipes: response};
}
app.get("/recipes/main_ingredient/:main_ingredient",async(req,res)=>{
  try{
  let main_ingredient = req.params.main_ingredient;
  let results = await filterByMainIngredient(main_ingredient);
  if(results.recipes.length === 0)
  {
    return res.status(404).json({message:"not found andy recipies by ingredient"+main_ingredient});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
});
//Exercise 3: Fetch All Recipes by Preparation Time
async function filterByPreparationTime(preparation_time)
{
  let query = "SELECT * FROM recipes WHERE preparation_time <= ?";
  let response = await db.all(query,[preparation_time]);
  return {recipes: response};
}
app.get("/recipes/preparation_time/:preparation_time",async(req,res)=>{
 try{
  let preparation_time = req.params.preparation_time;
  let results = await filterByPreparationTime(preparation_time);
  if(results.recipes.length === 0)
  {
    return res.status(404).json({message:"not found any recipes by preparation time"+preparation_time});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 4: Fetch All Recipes by Difficulty
async function filterByDifficulty(difficulty)
{
  let query = "SELECT * FROM recipes WHERE difficulty =?";
  let response = await db.all(query,[difficulty]);
  return {recipes : response};
}
app.get("/recipes/difficulty/:difficulty",async(req,res)=>{
  try{
  let difficulty = req.params.difficulty;
  let results = await filterByDifficulty(difficulty);
  if(results.recipes.length === 0)
  {
    return res.status(404).json({message:"No Recipes Found by difficulty"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 5: Fetch All Recipes by Vegetarian Status
async function filterByVegetarian(vegetarian)
{
  let query = "SELECT * FROM recipes WHERE vegetarian = ?";
  let response = await db.all(query,[vegetarian]);
  return {recipes:response};
}
app.get("/recipes/vegetarian/:vegetarian",async(req,res)=>{
 try{
  let  vegetarian = req.params.vegetarian;
  let results = await filterByVegetarian(vegetarian);
  if(results.recipes.length === 0)
  {
    return res.status(404).json({message:"No vegetarian status found"+vegetarian});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
  app.listen(PORT, () => console.log('server running on port 3000'));