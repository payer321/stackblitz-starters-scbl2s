
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
    filename: './BD4.5/BD4.5HW3/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch Kitchen Items by Minimum Rating
async function filterKitchenItemsByRating(minRating)
{
  let query = "SELECT * FROM kitchenItems WHERE rating <= ? ";
  let response = await db.all(query,[minRating]);
  return {kitchenItems:response};
}
app.get("/kitchen-items/rating",async (req,res)=>{
  let minRating = req.query.minRating;
  try{
  let results = await filterKitchenItemsByRating(minRating);
  if(results.kitchenItems.length === 0)
  {
    return res.status(404).json({message:"not found kitchen items by"+minRating});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.json(500).json({error:error.message});
}
})

//Exercise 2: Fetch Kitchen Items by Material and Rating
async function filterKitchenItemsByMaterialRating(rating,material)
{
  let query = "SELECT * FROM kitchenItems WHERE rating <= ? AND material = ? ";
  let response = await db.all(query,[rating,material]);
  return {kitchenItems:response};
}
app.get("/kitchen-items/material-rating",async (req,res)=>{
  let rating = req.query.rating;
  let material = req.query.material;
  try{
  let results = await filterKitchenItemsByMaterialRating(rating,material);
  if(results.kitchenItems.length === 0)
  {
    return res.status(404).json({message:"not found kitchen items by"+rating+"AND"+material});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.json(500).json({error:error.message});
}
})
//Exercise 3: Fetch Kitchen Items Ordered by Price
async function filterKitchenItemsOrderedByPrice()
{
  let query = "SELECT * FROM kitchenItems WHERE ORDER BY price ";
  let response = await db.all(query,[]);
  return {kitchenItems:response};
}
app.get("/kitchen-items/ordered-by-price",async (req,res)=>{
  
  try{
  let results = await filterKitchenItemsOrderedByPrice();
  if(results.kitchenItems.length === 0)
  {
    return res.status(404).json({message:"not found kitchen items"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.json(500).json({error:error.message});
}
})
app.listen(PORT, () => console.log('server running on port 3000'));