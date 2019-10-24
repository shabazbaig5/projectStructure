const mysql = require('mysql');
require('dotenv').config();

// console.log(env);
let db_passcode = process.env.db_passcode;

// console.log(db_passcode);

const connectionCarrier = mysql.createConnection({

  host : 'localhost',
  user : 'root',
  password : db_passcode,
  database:'usersdata'

});


module.exports = () => {

  return connectionCarrier;

}