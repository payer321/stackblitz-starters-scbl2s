let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4.1HW1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Exercise 1: Fetch All Books
const  fetchAllBooks  = async () =>
{
   let query = "SELECT * FROM books";
   let response = await db.all(query,[]);
   return {books : response};
};
app.get("/books",async  (req,res)=>{
   let results = await fetchAllBooks();
   res.status(200).json(results);
});


app.listen(PORT, () => console.log('server running on port 3001'));