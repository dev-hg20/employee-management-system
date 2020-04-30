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
        //BONUS
        //   "Update Employee Managers",
        //   "View Employees By Manager",
        //   "Delete Department",
        //   "Delete Role",
        //   "Delete Employees",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add Departments":
          addDeparment();
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
      connection.query("INSERT INTO department SET ? ", answer);
    });
}

start();
