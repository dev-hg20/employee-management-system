USE employee_db;

INSERT INTO department (name) VALUES
	("shoes"),
    ("makeup"),
    ("mens"),
    ("womens"),
    ("children");
    
SELECT * FROM department;

INSERT INTO role (title,salary,department_id) VALUES 
	("manager", 100000, 1),
    ("sales assistant", 50000, 2),
    ("senior sales assistant", 80000, 3);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
	 ("Jim","Barnes",1, NULL),
     ("Jane","Doe",2, 1),
	 ("Bob","Bob",3, NULL);