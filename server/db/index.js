// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require("./database");
const Project = require("./project");
const Robot = require("./robot");

Robot.belongsToMany(Project, { through: "project_robots" });
Project.belongsToMany(Robot, { through: "project_robots" });

const yo = async () => {
  // console.log("robot", Robot);
  // console.log("object keys robot", Object.keys(Robot));
  try {
    const tim = await Robot.findAll({
      where: {
        id: 1,
      },
      include: {
        model: Project,
      },
    });
    // console.log("tim", tim[0]);
    // console.log("object keys tim", Object.keys(tim[0]));
    console.log(
      "tim OG projects",
      tim[0].projects.map((project) => project.id)
    );
    console.log(`remove project ${tim[0].projects[0].dataValues.id}`);

    const test = await tim[0].removeProject(tim[0].projects[0]);


    console.log(
      "tim new projects",
      tim[0].projects.map((project) => project.id)
    );

  } catch (err) {
    //...
    console.error(err);
  }
};

// yo();

module.exports = {
  // Include your models in this exports object as well!
  db,
  Project,
  Robot,
};
