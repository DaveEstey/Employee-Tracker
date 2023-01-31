const express = require("express");
const inquirer = require("inquirer");
const sql = require("mysql2");
const table = require("console.table");
const request = require("request");


const app = express()
const PORT = process.env.PORT || 3001


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'business_db'
    }
)

db.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + db.user);
    const b = new Business;
    b.makeMenu();
  });

class Business {

    constructor() { }

    makeMenu()  {
        console.log("made menu")
        return inquirer
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
                        this.viewDepartments();
                        break;
                    case "View all roles":
                        this.viewRoles();
                        break;
                    case "View all employees":
                        this.viewEmployees();
                        break;
                    case "Add a department":
                        this.addDeparnments();
                        break;
                    case "Add a role":
                        this.addRole();
                        break;
                    case "add an employee":
                        this.addEmployee();
                        break;
                    case "Update an employee":
                        this.updateEmployee();
                        break;
                }
                 this.makeMenu();
            });

    }

   

   

   viewDepartments() { 
        const getDepartments = `SELECT * FROM department`;
        db.query(getDepartments, (err, data) => {
            err ? err.status(500).json({ Error: err.message }) : console.table("\n", data);
        });
    }

    viewRoles() {
        const getRoles = `SELECT id, role.title AS Title, department.name AS Department, role.salary AS Salary
        FROM role
        LEFT JOIN department
           ON role.department_id = department.id`;
        db.query(getRoles, (err, data) => {
            err ? err.status(500).json({ Error: err.message }) : console.table(data)
        });
    }

    viewEmployees() {
        const getEmployees = `SELECT employee.first_name, employee.last_name, role.title AS Title, department.name AS Department
        FROM employee
        LEFT JOIN role
           ON  employee.role_id = role.id
        LEFT JOIN department
           ON role.department_id = department.id`;
        
       db.query(getEmployees, (err, data) => {
            err ? err.status(500).json({ Error: err.message }) : console.table(data)
        });
    }
}

    // addRole() {}



