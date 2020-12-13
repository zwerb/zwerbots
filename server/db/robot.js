const Sequelize = require("sequelize");
const db = require("./database");

// !DOCUMENTATION
// Robot Model Reference for Developers:
// robot = {
//     name: "R2-D2",
//     imageUrl: "/images/r2d2.png",
//     fuelType: "electric",
//     fuelLevel: 88.34,
//   }

const Robot = db.define("robot", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING(1024),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[/images/].+[[png]|[jpg]|[jpeg]]$/g,
    },
    defaultValue: "/images/robots/default.png",
  },
  fuelType: {
    type: Sequelize.ENUM({
      values: ["diesel", "gas", "electric"],
    }),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "electric",
  },
  fuelLevel: {
    // !REMOVE - had to use FLOAT to pass the specs
    // type: Sequelize.DECIMAL(10, 2),
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isNumeric: true, 
      notEmpty: true,
      max: 100,
      min: 0,
    },
    defaultValue: 100,
  },
});

module.exports = Robot;
