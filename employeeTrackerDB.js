
const inquirer = require('inquirer');

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

const init = () => {
    connection.connect((err) => {
        if (err) console.log(err)
    })
}
const logo = require("asciiart-logo")
const LOGO = () => {
    const logotext = logo({ name: "employees" }).render()
    console.log(logotext)
    questions();
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
                return questions();
        }
    })
}

function viewEmp() {
    connection.query("SELECT * FROM employee")
}
// function empDep() {

// }
// function empMan() {

// }
function addEmp() {
    connection.query("SELECT * FROM roles", function (err, roleResults) {
        connection.query("SELECT * FROM employee", function (err, employeeResults) {

            const viewEmployee = employeeResults.map(employee => {
                return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
            })

            viewEmployee.push({ name: "None", value: null })

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
                    type: "rawlist",
                    name: "role",
                    message: "What is their role?",
                    choices: function () {
                        var rolesArray = [];
                        for (var i = 0; i < roleResults.length; i++) {
                            var role = {
                                name: roleResults[i].title,
                                value: roleResults[i].id
                            }
                            rolesArray.push(role);
                        }
                        return rolesArray;

                    }
                },
                {
                    type: "input",
                    name: "department",
                    message: "What's the  employee's department",
                }


            ]).then((answers) => {
                connection.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                    [
                        answers.first_name,
                        answers.last_name,
                        answers.role_id,
                        answers.manager_id
                    ],
                    (err, res) => {
                        if (err) console.log(err);
                        chooseAction();
                    }
                )
                init();
            })
        })
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
// function questions() {

// }
init();
        LOGO();
