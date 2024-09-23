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
    filename: './BD4.5/BD4.5HW1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch Courses by Minimum Rating
async function filterCoursesByRating(minRating)
{
  let query ="SELECT * FROM  courses WHERE rating >= ?";
  let response = await db.all(query,[minRating]);
  return{ courses: response};
}
app.get("/courses/rating",async(req,res)=>{
  
  let minRating = req.query.minRating;
  try{
  let results = await filterCoursesByRating(minRating);
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"No course found by"+minRating});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
})
//Exercise 2: Fetch Courses by Instructor and Minimum Duration
async function filterCoursesByInstructorAndDuration(instructor,minDuration)
{
  let query = "SELECT * FROM courses WHERE instructor =? AND duration =?  ";
  let response = await db.all(query,[instructor,minDuration]);
  return{courses:response}
}
app.get("/courses/instructor-duration",async(req,res)=>{
  
  let instructor = req.query.instructor;
  let minDuration = req.query.minDuration;
  try{
  let results = await filterCoursesByInstructorAndDuration(instructor,minDuration);
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"Not found any courses by"+instructor+"and"+minDuration});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})
//Exercise 3: Fetch Courses Ordered by Price
async function fetchCoursesOrderedByPrice()
{
  let query = "SELECT * FROM courses  ORDER BY price ";
  let response = await db.all(query,[]);
  return {courses:response};
}
app.get("/courses/ordered-by-price",async(req,res)=>{
 try{
  let results = await fetchCoursesOrderedByPrice()
  if(results.courses.length === 0)
  {
    return res.status(404).json({message:"not found courses"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
app.listen(PORT, () => console.log('server running on port 3000'));