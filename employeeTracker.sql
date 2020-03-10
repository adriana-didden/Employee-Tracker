DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE employee(
    id INT AUTO_INCREMENT,
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
INSERT INTO employee VALUES ("1","John","Doe","1","3");
INSERT INTO employee VALUES ("2","Mike","Chan","2","1");
INSERT INTO employee VALUES ("3","Ashley", "Rodriguez","3",null);
INSERT INTO employee VALUES ("4","Kevin","Tupik","4","3");
INSERT INTO employee VALUES ("5","Malia","Brown","5",null);
INSERT INTO employee VALUES ("6","Sarah","Lourd","6",null);
INSERT INTO employee VALUES ("7","Tom","Allen","7","6");
INSERT INTO employee VALUES ("8","Christian","Eckenrode","3","2");

INSERT INTO department VALUES ("1","sales");
INSERT INTO department VALUES ("2","engineering");
INSERT INTO department VALUES ("3","finance");
INSERT INTO department VALUES ("4","legal");

INSERT INTO role VALUES ("1","SalesPerson", "55000","1");
INSERT INTO role VALUES ("2","SalesLead"," 100000","1");
INSERT INTO role VALUES ("3","LeadEngineer"," 150000","2");
INSERT INTO role VALUES ("4","SoftwareEngineer"," 85000","2");
INSERT INTO role VALUES ("5","Accountant"," 120000","3");
INSERT INTO role VALUES ("6","LegalTeamLead"," 250000","4");
INSERT INTO role VALUES ("7","Lawyer","190000","4");