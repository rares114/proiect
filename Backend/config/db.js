const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("MySQL connected");
    return connection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const executeQuery = async (queryText, params) => {
  try {
    var connection = await connectDB();

    var result = await connection.query(queryText, params);

    connection.end();

    return result;
  } catch (e) {
    console.log(`Cannot execute query: ${e}`);
  }
};

module.exports = executeQuery;
