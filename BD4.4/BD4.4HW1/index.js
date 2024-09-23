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
    filename: './BD4.4/BD4.4HW1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Courses
async function fetchAllCourses()
{
  let query = "SELECT * FROM courses";
  let response = await db.all(query,[]);
  return {courses:response};
}
app.get("/courses",async(req,res)=>{
  try{
  let results = await fetchAllCourses();
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"not found any course"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 2: Fetch Courses by Instructor
async function fetchCoursesByInstructor(instructor)
{
  let query = "SELECT id, title, instructor , category FROM courses WHERE instructor = ?";
  let response = await db.all(query,[instructor]);
  return {courses:response}
}
app.get("/courses/instructor/:instructor",async(req,res)=>{
  try{
  let instructor = req.params.instructor;
  let results = await fetchCoursesByInstructor(instructor);
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"not found any courses by instructor"+instructor});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 3: Fetch Courses by Category
async function fetchCoursesByCategory(category)
{
  let query = "SELECT id , title,release_year,category FROM courses WHERE category = ? ";
  let response = await db.all(query,[category]);
  return{courses:response};
}
app.get("/courses/category/:category",async(req,res)=>{
  try{
  let category = req.params.category;
  let results = await fetchCoursesByCategory(category);
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"not found courses by category"+category});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 4: Fetch Courses by Year
async function fetchCoursesByYear(year)
{
  let query = "SELECT id,title,release_year,category FROM courses WHERE release_year = ?";
  let response = await db.all(query,[year]);
  return{courses:response};
}
app.get("/courses/year/:year",async(req,res)=>{
 try{
  let year = req.params.year;
  let results = await fetchCoursesByYear(year);
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"not found courses by year"+year});
  }
 return  res.status(200).json({results});
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
app.listen(PORT, () => console.log('server running on port 3000'));