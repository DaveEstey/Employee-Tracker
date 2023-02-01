const inquirer = require("inquirer");
const sql = require("mysql2");
const table = require("console.table");

const db = sql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'business_db'
  }
)






const makeMenu = () => {
  inquirer
    .prompt(
      {
        type: "list",
        name: "menu",
        message: "Choose what you would like to do!",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
      }
    )
    .then(data => {
      switch (data.menu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        /* case "Add a department":
          addDeparnments();
        case "Add a role":
          addRole();
        case "add an employee":
          addEmployee();
        case "Update an employee":
          updateEmployee(); */
      }
    });
}


makeMenu();


const viewDepartments = () => {
  const getDepartments = `SELECT * FROM department`;
  db.query(getDepartments, (err, data) => {
    if (err) throw err
    else {
      console.table(data);
      makeMenu();
    }
  });
}

const viewRoles = () => {
  const getRoles = `SELECT role.title AS Title, department.name AS Department, role.salary AS Salary
        FROM role
        LEFT JOIN department
          ON role.department_id = department.id`;
  db.query(getRoles, (err, data) => {
    if (err) throw err
    else {
      console.table(data);
      makeMenu();
    }
  });
}

const viewEmployees = () => {
  const getEmployees = `SELECT employee.first_name, employee.last_name, role.title AS Title, department.name AS Department
        FROM employee
        LEFT JOIN role
           ON  employee.role_id = role.id
        LEFT JOIN department
           ON role.department_id = department.id`;

  db.query(getEmployees, (err, data) => {
    if (err) throw err;
    else {
      console.table(data);
      makeMenu();
    }
  })
}

