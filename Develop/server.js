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
          getRoles().then(function (res) {
            console.table(res);
            console.log("\n");
            start();
          });
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "View Employees":
          getEmployees().then(function (res) {
            console.table(res);
            console.log("\n");
            start();
          });
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
    // console.table(departments);
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
          message: "Which deparment will this role sit in?",
          choices: departments,
        },
      ])
      .then(function (answers) {
        console.table(answers);
        connection.query(
          "INSERT INTO role SET (title, salary,department_id) value (${title},${$salary},{$department_id}",
          answers,
          () => getRoles()
        );
      });
  });
}

function getRoles() {
  return connection.query("SELECT * FROM role");
  // connection.query("SELECT * FROM role", function (err, res) {
  //   if (err) throw err;
  //   start();
  // });
}

function getEmployees() {
  return connection.query("SELECT * FROM employee");
}

function updateRoles() {
  inquirer
    .prompt([
      {
        name: "employee",
        type: "input",
        message: "Which employee would you like to update?",
      },
    ])
    .then(function (answers) {
      connection.query("UPDATE employee SET ? WHERE ?", [{}]);
    });
}

start();
