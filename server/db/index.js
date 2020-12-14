// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");
const Project = require("./project");
const Robot = require("./robot");

Robot.belongsToMany(Project, { through: "project_robots" });
Project.belongsToMany(Robot, { through: "project_robots" });


module.exports = {
  // Include your models in this exports object as well!
  db,
  Project,
  Robot,
};
