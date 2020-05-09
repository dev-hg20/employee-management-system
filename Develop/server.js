var inquirer = require("inquirer");
var connection = require("./db/connection");

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Departments",
        "View Departments",
        "Add Roles",
        "View Roles",
        "Add Employees",
        "View Employees",
        "Update Roles",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add Departments":
          addDeparment();
          break;
        case "View Departments":
          getDepartments().then(function (res) {
            console.table(res);
            console.log("\n");
            start();
          });
          break;
        case "Add Roles":
          addRole();
          break;
        case "View Roles":
          viewRole();
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "View Employees":
          viewEmployee();
          break;
        case "Update Roles":
          updateRoles();
          break;
        default:
          start();
      }
    });
}

function addDeparment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What deparment would you like to add?",
    })
    .then(function (answer) {
      connection.query("INSERT INTO department SET ? ", answer, () =>
        getDepartments()
      );
    });
}

function getDepartments() {
  return connection.query("SELECT * FROM department");
}

function addRole() {
  getDepartments().then((res) => {
    const departments = res.map(function (dep) {
      return { id: dep.id, name: dep.name };
    });
    console.table(departments);
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What title of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the role?",
        },
        {
          name: "department_id",
          type: "rawlist",
          message: "What is the salary of the role?",
          choices: departments,
        },
      ])
      .then(function (answers) {
        console.log(answers);
        // connection.query("INSERT INTO role SET ?", answer, () =>
        //   viewRoles()
        // );
      });
  });
}

function viewRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function updateRole() {
  var query = connection.query("UPDATE employee SET ? WHERE ?");
}

start();
