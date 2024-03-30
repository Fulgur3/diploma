const mysql = require('mysql');

const configData= {
    host:"localhost",
    user:"root",
    password:"root",
    database:"diploma"
}

const db = mysql.createConnection(configData)

module.exports =  db;