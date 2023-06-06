const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'testing'
    });

    console.log('MySQL connected');

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
