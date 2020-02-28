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

let selFunctionPromt = { 
name: "selFunction",
type: "list",
message: "Would you like to add, view or update the Employee Database?",
choices:[
  "add",
  "view all",
  "update",
  "exit"
]};

let addEmployeesPromt = [{
  type: "input",
  name: "firstName",
  message: "enter employees first name"},
  { type: "input",
  name: "lastnName",
  message: "enter employees last name"},
];
let addOptionsPromt = {
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

    console.log(firstName +" " +lastnName)
    
    
    

  })
};
function addRole(){

};
function addDepartment(){

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

  console.log("Please select an employee")
};


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  main();
});