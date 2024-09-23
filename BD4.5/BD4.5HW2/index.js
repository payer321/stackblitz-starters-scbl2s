
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
    filename: './BD4.5/BD4.5HW2/database.sqlite',
    driver: sqlite3.Database,
  });
})();
//Exercise 1: Fetch Employees by Minimum Salary
async function filterEmployeesBySalary(minSalary)
{
  let query="SELECT * FROM employees WHERE salary >=?";
  let response = await db.all(query,[minSalary]);
  return{employees:response};
}
app.get("/employees/salary",async(req,res)=>{
 
  let minSalary = req.query.minSalary;
 try{
  let results = await filterEmployeesBySalary(minSalary);
 
  if(results.employees.length === 0)
  {
    return res.status(404).json({message:"not found employees by  minimum salary"+minSalary})
  }
return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message})
}
})

//Exercise 2: Fetch Employees by Department and Minimum Experience
async function filterEmployeesByDepartmentAndExperience(department,minExperience)
{
  let query = "SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?";
  response = await db.all(query,[department,minExperience]);
  return { employees:response};
}
app.get("/employees/department-experience",async(req,res)=>{
  let department = req.query.department;
  let minExperience = req.query.minExperience;
  try{
    let results = await filterEmployeesByDepartmentAndExperience(department,minExperience);
    if(results.employees.length === 0)
    {
      return res.status(404).json({message:"not found employees by"+department+"and"+minExperience});
    }
    return res.status(200).json(results);
  }catch(error)
  {
    return res.status(500).json({error:error.message});
  }
  
})

//Exercise 3: Fetch Employees Ordered by Salary
async function fetchEmployeesOrderedBySalary()
{
  let query = "SELECT * FROM employees ORDER BY salary DESC";
  let response =await db.all(query,[]);
  return {employees:response};
}
app.get("/employees/ordered-by-salary",async(req,res)=>{
  try{
  let results = await fetchEmployeesOrderedBySalary();
  if(results.employees.length === 0)
  {
    return res.status(404).json({message:"not found any employee"});
  }
  return res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error:error.message});
}
})

app.listen(PORT, () => console.log('server running on port 3000'));