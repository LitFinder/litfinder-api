const database = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};

const getConnection = async () => {
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(database);
  return connection;
};

export default getConnection;
