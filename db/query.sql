SELECT employee.first_name, employee.last_name, role.title AS Title, department.name AS Department
FROM employee
LEFT JOIN role
   ON  employee.role_id = role.id
LEFT JOIN department
   ON role.department_id = department.id