const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678'
})

const createDatabaseSql = 'CREATE DATABASE IF NOT EXISTS forum DEFAULT CHARSET utf8 COLLATE utf8_general_ci;';

const useDatabase = 'USE forum';

const createPlateTablePlatesSql = `CREATE TABLE IF NOT EXISTS plates (
  id INT UNSIGNED AUTO_INCREMENT,
  author VARCHAR(40) NOT NULL,
  title VARCHAR(40) NOT NULL,
  ${'`desc`'} VARCHAR(160) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

const createUsersTableSql = `CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT,
  openid VARCHAR(40) NOT NULL,
  avatar VARCHAR(40) DEFAULT NULL,
  nick_name VARCHAR(40) DEFAULT NULL,
  gender INT(10) DEFAULT 0,
  mobile VARCHAR(40) DEFAULT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8`

function query(sql, successMsg) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error,  results, fields) => {
      if (error) {
        reject();
        throw error;
      }
      successMsg && console.log(successMsg);
      console.log(results, fields);
      resolve();
    })
  })
}

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  query(createDatabaseSql, 'create database success！')
    .then(() => query(useDatabase))
    .then(() => query(createPlateTablePlatesSql))
    .then(() => query(createUsersTableSql))
});
