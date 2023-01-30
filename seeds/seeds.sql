INSERT INTO department (name)
VALUES (1, "ENG"),
    (2, "SALES"),
    (3, "MARKETING"),
    (4, "SUPPORT");

INSERT INTO role (title, salary, department_id)
VALUES ("LEAD", 65000, 1),
    ("JUNIOR", 30000, 2),
    ("SENIOR", 50000, 3),
    ("LEAD", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("JOHN", "DOE", 2, null),
    ("JANE", "SMITH", 3, 1),
    ("TOM", "LONG", 4, 1),
    ("MAX", "BIGG", 1, null);