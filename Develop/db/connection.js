const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  //   port: 3306,

  // Your username
  user: "root",

  // Your password - remebner to empty password
  password: "Lemonade123!",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

connection.query = util.promisify(connection.query);

module.exports = connection;
