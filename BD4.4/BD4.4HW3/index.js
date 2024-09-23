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
    filename: './BD4.4/BD4.4HW3/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Books
async function fetchAllBooks()
{
  let query = "SELECT id ,title , author FROM books";
  let response = await db.all(query,[]);
  return{books: response};
}
app.get("/books",async(req,res)=>{
  try{
  let results = await fetchAllBooks();
  if(results.books.length === 0)
  {
    return res.status(404).json({message:"not found books"});
  }
return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 2: Fetch Books by Author
async function fetchBooksByAuthor(author)
{
  let query = "SELECT id,title,author,year FROM books WHERE author = ?";
  let response =await db.all(query,[author]);
  return{books:response};
}
app.get("/books/author/:author",async(req,res)=>{
 try{
  let author = req.params.author;
  let results = await fetchBooksByAuthor(author);
  if(results.books.length === 0)
  {
    return res.status(404).json({message:"not found books by author"+author});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 3: Fetch Books by Genre
async function fetchBooksByGenre(genre)
{
  let query = "SELECT id,title,author,genre FROM books WHERE genre = ?";
  let response =await db.all(query,[genre]);
  return{books:response};
}

app.get("/books/genre/:genre",async(req,res)=>{
  try{
   let genre = req.params.genre;
   let results = await fetchBooksByGenre(genre);
   if(results.books.length === 0)
   {
     return res.status(404).json({message:"not found books by genre"+genre});
   }
   return res.status(200).json(results);
 }catch(error)
 {
   return res.status(500).json({error:error.message});
 }
 })
 //Exercise 4 : Fetch Books by Year
 async function fetchBooksByYear(year)
 {
  let query = "SELECT id,title,author,genre ,year  FROM books WHERE year = ?";
  let response =await db.all(query,[year]);
  return{books:response};
 }
 app.get("/books/year/:year",async(req,res)=>{
  try{
   let year = req.params.year;
   let results = await fetchBooksByYear(year);
   if(results.books.length === 0)
   {
     return res.status(404).json({message:"not found books by year"+year});
   }
   return res.status(200).json(results);
 }catch(error)
 {
   return res.status(500).json({error:error.message});
 }
 })
app.listen(PORT, () => console.log('server running on port 3000'));