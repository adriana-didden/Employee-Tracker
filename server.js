
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
    LOGO();
    options();
})


const logo = require("asciiart-logo")
const LOGO = () => {
    const logotext = logo({ name: "employees" }).render()
    console.log(logotext)
}

function options() {
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
// function empDep() {

// }
// function empMan() {

// }
function addEmp() {
    connection.query("SELECT title FROM role", function (err, results) {
        if (err) throw err;
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
                choices: function () {
                    var roleChoice = [];
                    for (var i = 0; i < results.length; i++) {
                        roleChoice.push(results[i].title)
                    }
                    return roleChoice;
                },
                message: "What is their role?"
            },
            {
                type: "input",
                name: "manager",
                message: "Whos the  employee's manager"
            }
        ]).then(function (answers) {
            answers.push(employee)
        })

    })
    options();

}
// function removeEmp() {

// }
// function updateEmpRoles() {

// }
// function updateMan() {

// }
// function allRoles() {

// }
// function addRole() {

// }
// function removeRole() {

// }
// function viewDep() {

// }
// function addDep() {

// }
// function remDep() {

// }
// function quit() {

// }
