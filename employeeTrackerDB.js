const inquirer = require('inquirer');
const logo = require("asciiart-logo")
const init = () => {
    const logotext = logo({ name: "employees" }).render()
    console.log(logotext)
    questions();
}
function questions() {
    inquirer.prompt([{
        type: "list",
        name: "do",
        message: "What would you like to do?",
        choices: ["view all employees", "view all employees by department", "view all employees by manager", "add employee", "remove employee", "update employee role", "update employee manager", "view all roles", "add role", "remove role", "view all departments", "add department", "remove department", "quit"]
    }]).then(answer => {
        switch (answer.do) {
            case "view all employees":
                return allEmp()
            case "view all employees by department":
                return empDep()
            case "view all employees by manager":
                return empMan()
            case "add employee":
                return addEmp()
            case "remove employee":
                return removeEmp()
            case "update employee role":
                return updateEmp()
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

function allEmp() {

}
function empDep() {

}
function empMan() {

}
function addEmp() {
    var employee = []
    inquirer.promtt([
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
            type: "input",
            name: "title",
            message: "What's the  employee's role?",
        },
        {
            type: "input",
            name: "department",
            message: "What's the  employee's department",
        },


    ])
}
function removeEmp() {

}
function updateEmp() {

}
function updateMan() {

}
function allRoles() {

}
function addRole() {

}
function removeRole() {

}
function viewDep() {

}
function addDep() {

}
function remDep() {

}
function questions() {

}
init();
