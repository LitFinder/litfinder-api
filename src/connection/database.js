const database = {
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  database: process.env.SQLDATABASE,
  port: process.env.PORT,
};

const getConnection = async () => {
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(database);
  return connection;
};

export default getConnection;
