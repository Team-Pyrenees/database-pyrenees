const mysql = require('mysql2');
const { mysqlInfo } = require('../config.js')

const connection = mysql.createConnection(mysqlInfo)

connection.connect(function (err) {
    if (err) {
      console.log('There was an error connecting MySQL')
    } else {
      console.log('You are connected to MySQL!')
    }
})

module.exports = {
    connection: connection
}