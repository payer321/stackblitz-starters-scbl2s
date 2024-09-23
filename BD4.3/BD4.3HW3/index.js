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
      filename: './BD4.3/BD4.3HW3/database.sqlite',
      driver: sqlite3.Database,
    })
  })();

  //Exercise 1: Fetch All Products by category
  async function fetchProductsByCategory(category)
  {
    let query = "SELECT * FROM products WHERE category = ? ";
    let response = await db.all(query,[category]);
    return {products: response};
  }
  app.get("/products/category/:category",async(req,res)=>{
    try{
    let category = req.params.category;
    let results = await fetchProductsByCategory(category);
    if(results.products.length === 0)
    {
      return res.status(404).json({message:"no product found by category"+category});
    }
    res.status(200).json(results);
  }catch(error)
  {
    return res.status(500).json({error:error.message})
  }
  })
//Exercise 2: Fetch Products by Brands
async function fetchProductsByBrand(brand)
{
  let query = "SELECT * FROM products WHERE brand = ?";
  let response = await db.all(query,[brand]);
  return {products:response};
}
app.get("/products/brand/:brand",async(req,res)=>{
 try{
  let brand = req.params.brand;
  let results = await fetchProductsByBrand(brand);
  if(results.products.length === 0)
  {
    return res.status(404).json({message:"not found product bybrand"+brand})
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 3: Fetch Products by Rating
async function fetchProductsByRating(rating)
{
  let query = "SELECT * FROM products WHERE rating >= ?";
  let response = await db.all(query,[rating]);
  return{products:response};
}
app.get("/products/rating/:rating",async(req,res)=>{
  try{
  let rating = req.params.rating;
  let results = await fetchProductsByRating(rating);
  if(results.products.length === 0)
  {
    return res.status(404).json({message:"not found product by rating"+rating});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 4 : Fetch products by stock Count
async function fetchProductsByStocks(stock)
{
  let query = "SELECT * FROM products WHERE stock <= ?";
  let response = await db.all(query,[stock]);
  return {products:response};
}
app.get("/products/stocks/:stock",async(req,res)=>{
  try{
  let stock = req.params.stock;
  let results = await fetchProductsByStocks(stock);
  if(results.products.length === 0)
  {
    return res.status(404).json({message:"No product found by stock cound"+stock});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})


  app.listen(PORT, () => console.log('server running on port 3000'));