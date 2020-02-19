DROP DATABASE IF EXISTS employee_bd;
CREATE DATABASE employee_bd;

USE employee_bd;

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
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
    departmemt_name VARCHAR(30)
);

