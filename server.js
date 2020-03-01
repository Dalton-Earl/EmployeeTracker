const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Earl4370",
  database: "employee_db"
});

const selFunctionPromt = { 
name: "selFunction",
type: "list",
message: "Would you like to add, view or update the Employee Database?",
choices:[
  "add",
  "view all",
  "update",
  "exit"
]};

const addEmployeesPromt = [{
  type: "input",
  name: "firstName",
  message: "enter employees first name"},
  { type: "input",
  name: "lastnName",
  message: "enter employees last name"},
];
const addRolePromt = [
  {
  type: "input",
  name: "role",
  message: "enter the name of the role you would like to add"
},
{
  type: "input",
  name: "salary",
  message: "enter the salary for the role"
}];
const addDepartmentPromt = {
  type: "input",
  name: "department",
  message: "enter the name of the new department"
};



const addOptionsPromt = {
  name: "addOptions",
  type: "list",
  message:"Do you want to add a Department, a new Role or a new Employee?",
  choices:[
    "Department",
    "Role",
    "Employee",
    "Start over"
  ]
};



function main(){
  inquirer.prompt(selFunctionPromt).then(answers => {
  let uses = answers.selFunction
  switch(uses){
    case uses = "add":
      addAll();
      break;
    case uses = "view all":
      viewALL();
      break;
    case uses = "update":
      updateEmployees();
      break;
    case uses = "exit":
      connection.end();
      break;

  }
  });
};
function addAll(){
inquirer.prompt(addOptionsPromt).then(answers => {
  let options = answers.addOptions
  switch(options){
    case options = "Department":
      addDepartment();
      break;
    case options = "Role":
      addRole();
      break;
    case options = "Employee":
      addEmployees();
      break;
    case options = "Start over":
      main();
      break;
  }
})
};
function addEmployees(){
  inquirer.prompt(addEmployeesPromt).then(answers =>{
    let firstName = answers.firstName;
    let lastnName = answers.lastnName;

    const dbQuery = "INSERT INTO employee (first_name, last_name) VALUES (?,?)";

    connection.query(dbQuery,[firstName,lastnName],function(err, res){
      if (err) throw err;
      console.log(`You added ${firstName} ${lastnName} to the database`);
      main();
    })
    
    
    

  })
};
function addRole(){
  inquirer.prompt(addRolePromt).then(answers =>{
    let roleName = answers.role;
    let salary = answers.salary;

    const dbQuery = "INSERT INTO role (title, salary) VALUES (?,?)";

    connection.query(dbQuery,[roleName,salary],function(err, res){
      if (err) throw err;
      console.log(`You added ${roleName} ${salary} to the role list `);
      main();
    })
    
    
    

  })
};
function addDepartment(){
  inquirer.prompt(addDepartmentPromt).then(answers =>{
    let departmentName = answers.department;

    const dbQuery = "INSERT INTO department (department_name) VALUES (?)";

    connection.query(dbQuery,[departmentName],function(err, res){
      if (err) throw err;
      
      main();
    })
  })
};
function viewALL(){
  const employeeTable = "SELECT * FROM employee, role, department;"
  connection.query(employeeTable, function(err,result){
    if (err) throw err;
    console.table(result);
    main();
  })
  
  
  
};
function updateEmployees(){
  
  const employeeListdbQuery = "SELECT first_name, last_name FROM employee_db.employee;"
  const employeeList = connection.query(employeeListdbQuery, function(err, result){
    if (err) throw err;
    // inquirer.prompt(employeeListPromt).then(answers =>{
      
    // })

  })

console.table(employeeList);
  
};


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  main();
});