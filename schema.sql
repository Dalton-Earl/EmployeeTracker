DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_increment,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

CREATE TABLE role(
    id INT PRIMARY KEY NOT NULL AUTO_increment,
    title VARCHAR(30),
    salary decimal,
    department_id INT
);

CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL AUTO_increment,
    department_name VARCHAR(30)
);

