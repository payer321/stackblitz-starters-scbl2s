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
    filename: './BD4.2/BD4.2HW1/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Exercise 1: Fetch All Books
async function fetchAllBooks()
{
  let query = "SELECT * FROM books";
  let response = await db.all(query,[]);
  return {books:response};
}
app.get("/books",async(req,res)=>{
  try{
  let results = await fetchAllBooks();
  if(results.books.length === 0){
    return res.status(404).json({message : "No Books Found"});
  }
  res.status(200).json(results);
    }catch(error)
  {
    return res.status(500).json({error : error.message});
  }
});
//Exercise 2: Fetch Books by Author
async function  getAllBooksByAuthor(author)
{
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query,[author])
  return{books:response}
}
app.get("/books/author/:author",async(req,res)=>{
  try{
    let author = req.params.author;
    let results = await getAllBooksByAuthor(author);
    if(results.books.length === 0){
      return res.status(404).json({message : "No book of this author  found"});
    }
    res.status(200).json(results);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});
//Exercise 3: Fetch Books by Genre
async function  getAllBooksByGenre(genre)
  {
    let query ="SELECT * FROM books WHERE genre = ?";
    let response = await db.all(query,[genre]);
    return{books:response}
  }
  app.get("/books/genre/:genre",async(req,res)=>{
    try{
    let genre = req.params.genre;
    let results = await getAllBooksByGenre(genre);
    if(results.books.length === 0)
    {
     return res.status(404).json({message:"Book never found"});
    }
    res.status(200).json(results);
  }catch(error)
  {
    return res.status(500).json({error: error.message});
  }
  })

//Exercise 4: Fetch Books by Publication Year
async function getAllBooksByPublicationYear(year)
{
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query,[year]);
  return {books:response};
}
app.get("/books/publication_year/:year",async(req,res)=>{
  try{
  let year = req.params.year;
  let results = await getAllBooksByPublicationYear(year);
  if(results.books.length === 0)
  {
   return res.status(404).json({message:"book not found"});
  }
  res.status(200).json(results);
  }catch(error)
  {
  return  res.status(500).json({error: error.message});
  }
})

app.listen(PORT, () => console.log('server running on port 3000'));
