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

var departmentsArr = [];
var employeesArr = [];
var rolesArr = [];

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
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
      }
    });
}

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

const saveDepartments = () => {
  const getDepartments = `SELECT * FROM department`;
  db.query(getDepartments, (err, data) => {
    if (err) throw err
    else {
      departmentsArr = data;
    }
  });
}

const saveRoles = () => {
  const roles = `SELECT role.title, role.id AS id FROM role`;
  db.query(roles, (err, data) => {
    if (err) throw err
    else {
      rolesArr = data;
      const rArr = rolesArr.map(array => {
        return array.title;
      });
      console.log(rArr)
    }
  });
}

const saveEmployees = () => {
  const employees = `SELECT * FROM employee`;
  db.query(employees, (err, data) => {
    if (err) throw err
    else {
      employeesArr = data;
    }
  });
}



const viewRoles = () => {
  const getRoles = `SELECT role.title AS Title, department.name AS Department, department.id AS ID, role.salary AS Salary
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
  const getEmployees = `SELECT employee.id AS ID, employee.first_name, employee.last_name, role.title AS Title, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager
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

const addDepartment = () => {
  inquirer
    .prompt(
      {
        type: "input",
        name: "depName",
        message: "What is the department name?"
      },
    )
    .then(data => {
      const addDepartment = `INSERT INTO department (name) VALUES ("${data.depName}");`

      db.query(addDepartment, (err) => {
        if (err) throw err;
        else {
          console.log("Successfully added Department!")
          makeMenu();
        };
      });
    });
}

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the role's name?"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the role's salary?"
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "What is the role's department?",
        choices: departmentArr
      },

    ])
    .then(data => {
      const departmentCompare = departmentArr.filter(department => department.name === data.roleDepartment);
      const answers = `INSERT INTO role (title, salary, department_id) VALUES ("${data.roleName}", "${data.roleSalary}", "${departmentCompare[0].id}"); `
      db.query(answers, (err) => {
        if (err)
          throw err;
        else {
          console.log("Successfully added Role!");
          makeMenu();
        };
      });
    });

}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "empFirstName",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "empLastName",
        message: "What is the employee's last name?"
      },
      {
        type: "list",
        name: "empRole",
        message: "What is the employee's role?",
        choices: rolesArr //can't seem to get the rolesArr to function like the departmentsArr 
      },
      {
        type: "input",
        name: "empManager",
        message: "What is the employee's manager's name?"
      },
    ])
    .then(data => {
      const roleCompare = rolesArr.filter(role => role.title === data.empRole);
      //Error because the array is being populated wrong
      const addEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.empFirstName}", "${data.empLastName}", ${roleCompare[0].id}, null);`

      db.query(addEmp, (err) => {
        if (err) throw err;
        else {
          console.log("Successfully added Employee!")
          makeMenu();
        };
      });
    });
}
saveRoles();
saveDepartments();
saveEmployees();
makeMenu();