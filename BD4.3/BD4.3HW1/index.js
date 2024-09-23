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
    filename: './BD4.3/BD4.3HW1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Employees by Gender
async function filterByGender(gender)
{
  let query ="SELECT * FROM employees WHERE gender = ?";
  let response = await db.all(query,[gender]);
  return {employees:response}
}
app.get("/employees/gender/:gender",async(req,res)=>{
  try{
  let gender = req.params.gender;
  let results = await filterByGender(gender);
  if(results.employees.length === 0)
  {
    return res.status(404).json({message:"no employee found"+gender});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 2: Fetch All Employees by Department
async function filterByDepartment(department)
{
let query = "SELECT * FROM employees WHERE department = ?";
let response = await db.all(query,[department]);
return{employees:response}
}
app.get("/employees/department/:department",async(req,res)=>{
  try{
  let department = req.params.department;
  let results = await filterByDepartment(department);
  if(results.employees.length === 0)
  {
    return res.status(404).json({message:"not found any department"+department});
  }
  res.status(200).json(results);
}catch(error)
{
  res.status(500).json({error:error.message});
}
})

//Exercise 3: Fetch All Employees by Job Title
async function filterByJobTitle(job_title)
{
  let query = "SELECT * FROM employees WHERE job_title = ?"
  let response = await db.all(query,[job_title]);
  return {employees: response}; 
}
app.get("/employees/job_title/:job_title",async(req,res)=>{
 try{
  let job_title = req.params.job_title;
  let results = await filterByJobTitle(job_title);
  if(results.employees.message === 0)
  {
    return res.status(404).json({message:"not found job title"+job_title})
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})
//Exercise 4: Fetch All Employees by Location
async function filterByLocation(location)
{
  let query ="SELECT * FROM employees WHERE location =?";
  let response = await db.all(query,[location]);
  return {employees: response};
}
app.get("/employees/location/:location",async(req,res)=>{
  try{
  let location = req.params.location;
  let results = await filterByLocation(location);
  if(results.employees.length === 0)
  {
    return res.status(404).json({message:"not found location "+location});
  }
  res.status(200).json(results);
}catch(error){
return res.status(500).json({error:error.message});
}
})

app.listen(PORT, () => console.log('server running on port 3000'));