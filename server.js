
const inquirer = require('inquirer');
var cTable = require("console.table")
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MeStuff!77",
    database: "employee_trackerDB"
});

connection.connect((err) => {
    if (err) console.log(err)

})


const logo = require("asciiart-logo")
const LOGO = () => {
    const logotext = logo({ name: "employees" }).render()
    console.log(logotext)
}

function options() {
    LOGO()
    inquirer.prompt([{
        type: "list",
        name: "do",
        message: "What would you like to do?",
        choices: ["view all employees", "view all employees by department", "view all employees by manager", "add employee", "remove employee", "update employee role", "update employee manager", "view all roles", "add role", "remove role", "view all departments", "add department", "remove department", "quit"]
    }]).then(answer => {
        switch (answer.do) {
            case "view all employees":
                return viewEmp()
            case "view all employees by department":
                return empDep()
            case "view all employees by manager":
                return empMan()
            case "add employee":
                return addEmp()
            case "remove employee":
                return removeEmp()
            case "update employee role":
                return updateEmpRoles()
            case "update employee manager":
                return updateMan()
            case "view all roles":
                return allRoles()
            case "add role":
                return addRole()
            case "remove role":
                return removeRole()
            case "view all departments":
                return viewDep()
            case "add department":
                return addDep()
            case "remove department":
                return remDep();
            case "quit":
                return quit();
        }
    })
}

function viewEmp() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", (err, res) => {
        if (err) throw err;
        console.log("---------------")
        console.table(res);
    })
    options();
}
function empDep() {

}
// function empMan() {


// }
function addEmp() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err;
        const roles = results.map(role => ({ name: role.title, value: role.id }))
        connection.query("SELECT * FROM employee", function (err, results) {
            const employeee = results.map(employeez => ({ name: `${employeez.last_name}, ${employeez.first_name} `, value: employeez.id }))
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What's the  employee's first name",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What's the  employee's last name",
                },
                {
                    type: "list",
                    name: "role",
                    choices: roles,
                    message: "What is their role?"
                },
                {
                    type: "list",
                    name: "manager",
                    choices: employeee,
                    message: "Whos the  employee's manager"
                }
            ]).then(function (answers) {
                console.log(answers)
                const theEmp = { first_name: answers.firstName, last_name: answers.lastName, role_id: answers.role, manager_id: answers.manager }
                connection.query('INSERT INTO employee SET ?', theEmp, (err, results) => {
                    if (err) throw err
                    options();
                })
            })

        })

    })
}
options();
// function removeEmp() {

// }
// function updateEmpRoles() {

// }
// function updateMan() {

// }
// function allRoles() {

// }
function addRole() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        const dep = results.map(department => ({ name: department.name, value: department.id }))
        inquirer
            .prompt([
                {
                    name: "dep",
                    type: "list",
                    choices: dep,
                    message: "which department would you like to add a role to?"
                },
                {
                    name: "newRole",
                    type: "input",
                    message: "What's the new role?"
                },
                {
                    name:"salary",
                    type:"input",
                    message: "What's the salary for the role?"
                }
            ]).then(function (answers) {
                console.log(answers)
                const theRole = { salary:answers.salary, title: answers.newRole, department_id: answers.dep }
                connection.query('INSERT INTO role SET ?', theRole, (err, results) => {
                    if (err) throw err
                    options();
                })
            })
    })
}
// function removeRole() {

// }
// function viewDep() {

// }
function addDep() {
        inquirer
            .prompt([
                {
                    name: "newDep",
                    type: "input",
                    message: "What's the new department name?"
                },

            ]).then(function (answers) {
                console.log(answers)
                const theDep = { name:answers.newDep }
                connection.query('INSERT INTO department SET ?', theDep, (err, results) => {
                    if (err) throw err
                    options();
                })
            })
    }
// function remDep() {

// }
// function quit() {

// }
