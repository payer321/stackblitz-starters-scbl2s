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
    filename: './BD4.1HW3/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Products
//function
async function fetchAllProducts()
{
let query = "SELECT * FROM products";
let response = await db.all(query,[]);
return {products : response};
}
app.get("/products",async(req,res) => {
  let results = await fetchAllProducts();
  res.status(200).json(results);
});
//Exercise 2: Retrieve Products by Brand
//function
async function retriveProductByBrand(brand)
{
  let query = "SELECT * FROM products WHERE brand = ?";
  let response = await db.all(query,[brand]);
  return {products : response}
}
app.get("/products/brand/:brand",async(req,res)=>{
  let brand = req.params.brand;
  let results = await retriveProductByBrand(brand);
  res.status(200).json(results);
});

//Exercise 3: Retrieve Products by Category
//function
async function fetchProductsByCategory(category)
{
  let query = "SELECT * FROM products WHERE category = ?";
  let response = await db.all(query,[category]);
  return { products : response};
}
app.get("/products/category/:category",async(req,res)=>{
  let category = req.params.category;
  let results = await fetchProductsByCategory(category);
  res.status(200).json(results);
})
//Exercise 4: Retrieve Products by stocks
//function
async function  fetchProductsByStock(stock)
{
  let query = "SELECT * FROM products WHERE stock = ?";
  let response = await db.all(query,[stock]);
  return{ products :stock};
}
app.get("/products/stock/:stock",async(req,res)=>{
  let stock = req.params.stock;
  let results = await fetchProductsByStock(stock);
  res.status(200).json(results);
})
app.listen(PORT, () => console.log('server running on port 3000'));