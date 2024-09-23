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
    filename: './BD4.2/BD4.2HW3/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Exercise 1: Fetch All Companies
async function fetchAllCompanies()
{
  let query = "SELECT * FROM companies";
  let response = await db.all(query,[]);
  return {companies : response}
}
app.get("/companies",async(req,res)=>{
  try{
  let results = await fetchAllCompanies()
  if(results.companies.length === 0)
  {
    return res.status(404).json({message: "no companies found"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
})
//Exercise 2: Fetch Companies by Industry
async function fetchCompaniesByIndustry(industry)
{
  let query = "SELECT * FROM companies WHERE industry = ?";
  let response = await db.all(query,[industry]);
  return {companies : response}
}
app.get("/companies/industry/:industry",async (req,res)=>{
 try{
  let industry = req.params.industry;
  let results = await fetchCompaniesByIndustry(industry);
  if(results.companies.length === 0){
    return res.status(404).json({message: "industry not found"});
  }
  res.status(200).json(results);
}catch(error){
  return res.status(500).json({error: error.message});
}
})
//Exercise 3: Fetch Companies by Revenue Range
async function fetchCompaniesByRevenue(minRevenue,maxRevenue)
{
  let query = "SELECT * FROM companies WHERE revenue BETWEEN ? AND ?"
  let response = await db.all(query,[minRevenue,maxRevenue]);
  return {companies:response};
}
app.get("/companies/revenue",async(req,res)=>{
  try{
  let minRevenue = req.query.minRevenue;
  let maxRevenue = req.query.maxRevenue;
  let results = await fetchCompaniesByRevenue(minRevenue,maxRevenue);
  if(results.companies.length === 0)
  {
    return res.status(404).json({message:"not found any revenue"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
});
//Exercise 4 : Fetch Companies by Employee Count
async function fetchCompaniesByEmployeesCount(employeesCount)
{
  let query = "SELECT *  FROM companies WHERE employee_count < ? ";
  let response = await db.all(query,[employeesCount]);
  return {companies : response};
}
app.get("/companies/employees/:employeesCount",async(req,res)=>{
 try{
  let employeesCount = req.params.employeesCount;
  let results = await fetchCompaniesByEmployeesCount(employeesCount);
  if(results.companies.length === 0)
  {
    return res.status(404).json({message: "no employee count fount"});
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
})
//Exercise 5: Fetch Companies by founded_year
async function fetchCompaniesByfoundedYear(founded_year)
{
  let query ="SELECT * FROM companies WHERE founded_year = ?";
  let response = await db.all(query,[founded_year]);
  return {companies: response};
}
app.get("/companies/founded_year/:founded_year",async(req,res)=>{
  try{
  let founded_year = req.params.founded_year;
  let results = await fetchCompaniesByfoundedYear(founded_year);
  if(results.companies.length === 0)
  {
    return res.status(404).json({message:" there is no any founded year record found"})
  }
  res.status(200).json(results);
}catch(error)
{
  return res.status(500).json({error: error.message});
}
})
app.listen(PORT, () => console.log('server running on port 3000'));