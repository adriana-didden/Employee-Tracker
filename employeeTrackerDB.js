
const inquirer = require('inquirer');
const cTable = require("console.table");

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
    options();
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
                return quit();
        }
    })
}
const viewEmp = () => {
    connection.query('SELECT * FROM employee RIGHT JOIN role', function (err,result) {
        if (err) throw err;
        console.table(result);
    })
    options();
};
const empDep = () => {

};
const empMan = () => {

}
let roleArray = ["sales lead","salesperson","Lead engineer", "software engineer", "accountant", "legal team lead", "lawyer"]

const addEmp = () => {
    connection.query("SELECT * FROM role", (err, results) => {
        if (err) console.log(err)
        connection.query("SELECT * FROM employee", (err, employeesResults) => {

            if (err) console.log(err)

            let viewEmp = employeesResults.map((employee) => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`, value: employee.id
                }
            });
            viewEmp.push({ name: "None", value: null })

            inquirer.prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What's the employee's first name"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What's the employee's last name"
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What's the employee's role",
                    choices: roleArray
                },
                {
                    name: "empManager",
                    type: "list",
                    message: "whos the employee's manager",
                    choices: viewEmp
                }
            ]).then((answer) => {
                connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        role_id: answer.role_id,
                        manager_id: answer.manager_id
                    }, (err, res) => {
                        if (err) return console.log(err);
                        console.log(`Your employee ${answer.first_name} ${answer.last_name} has been added.`)
                        options();
                    }
                )
            });
        })
    })
}

const removeEmp = () => {

}
const updateEmp = () => {

}
const updateMan = () => {

}

let departmentArray = ["sales", "engineering", "finance", "legal"]

const viewDep = () => {

}
const addDep = () => {

}
const remDep = () => {

}
const quit = () => {

}
init();
LOGO();
