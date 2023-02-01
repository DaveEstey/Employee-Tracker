INSERT INTO department (name)
VALUES ( "ENG"),
    ("SALES"),
    ("MARKETING"),
    ("SUPPORT");

INSERT INTO role (title, salary, department_id)
VALUES ("LEAD", 65000, 1),
    ("JUNIOR", 30000, 3),
    ("SENIOR", 50000, 4),
    ("LEAD", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("JOHN", "DOE", 1, null),
    ("JANE", "SMITH", 1, 1),
    ("TOM", "LONG", 1, 1),
    ("MAX", "BIGG", 1, null);