const express = require("express");
const { default: inquirer } = require("inquirer");
const sql = require("mysql2");
const table = require("console.table");

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => console.log(res))
const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'business_db'
    }
)


class Business {

    constructor()

    async makeMenu() {
        const data = await inquirer
            .prompt([
                {
                    type: "menu",
                    name: "menu",
                    message: "Choose what you would like to do!",
                    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
                },
            ]);
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
            case "Add a department":
                addDeparnments();
                break;
            case "Add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "Update an employee":
                updateEmployee();
        }
    };

    viewDepartments() {
        const getDepartments = `SELECT * FROM department`;
        db.query(getDepartments, (err, data) => {
            err ? res.status(500).json({ Error: err.message }) : console.table(data);
        });
    }
}




app.listen(PORT, () => {
    console.log(`LIVE SERVER: ${PORT}`)
})