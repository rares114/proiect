const mysql = require("mysql2/promise");

const userSchema = {
  name: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  email: {
    type: 'VARCHAR(255)',
    allowNull: false,
    unique: true,
  },
  password: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  phone: {
    type: 'VARCHAR(255)',
    allowNull: false,
  },
  isshop: {
    type: 'BOOLEAN',
    allowNull: false,
  },
};

module.exports = { userSchema };