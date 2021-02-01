const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'mysqlserver-pi-instance.ck1evgdwmyzg.sa-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'pacients_database'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});