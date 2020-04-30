DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
id INT auto_increment PRIMARY KEY,
name varchar(30) NOT NULL
);

CREATE TABLE role (
id INT auto_increment PRIMARY KEY,
title varchar(30) NOT NULL, 
salary decimal NOT NULL, 
department_id int, 
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id INT auto_increment PRIMARY KEY,
first_name varchar(30) NOT NULL, 
last_name varchar(30) NOT NULL, 
role_id int, 
manager_id int, 
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE NO ACTION, 
CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);