const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("./database");

// !DOCUMENTATION
// Project Model Reference for Developers:
// project = {
//     title: 'Make pizza',
//     deadline: '2020-12-22 12:03:44',
//     priority: 9,
//     completed: false,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
//   };

// !REPLACE
// In production make this a user setting variable
const usersTimeZone = 'America/New_York';

const Project = db.define("project", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  deadline: {
    type: Sequelize.DATE(6),
    allowNull: false,
    validate: {
      notEmpty: true,
      isDate: true,
    },
    defaultValue: new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleString('en-US', { timeZone: usersTimeZone }))
  },
  completed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: false,
  },
  priority: {
    // !REMOVE - had to use FLOAT to pass the specs
    // type: Sequelize.DECIMAL(10, 2),
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 10,
      min: 1,
    },
    defaultValue: 10,
  },
});

module.exports = Project;
