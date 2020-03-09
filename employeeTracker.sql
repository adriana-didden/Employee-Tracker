DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE employee(
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER (10) NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary decimal,
    department_id INTEGER,
    PRIMARY KEY (id)  
    );

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);