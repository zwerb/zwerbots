/* eslint-disable complexity */
const { green, red } = require("chalk");
const { db, Project, Robot } = require("./server/db");

const robots = require("./robots-seed101");
const projects = require("./projects-seed101");

const seed = async () => {
  try {

    await db.sync({ force: true });

    await Promise.all(
      robots.map((robot) => {
        return Robot.create(robot);
      })
    );

    console.log("Seeded Robots.");

    await Promise.all(
      projects.map((project) => {
        return Project.create(project);
      })
    );

    console.log("Seeded Projects.");

    /* Assocation Logic */

    const dbRobotsAll = await Robot.findAll();
    const dbProjectsAll = await Project.findAll();

    // Don't add any tasks or projects to the final indicies (test specs)
    const dbRobots = dbRobotsAll.slice(0, dbRobotsAll.length - 1);
    const dbProjects = dbProjectsAll.slice(0, dbProjectsAll.length - 1);

    const numRobots = dbRobots.length || 0;
    const numProjects = dbProjects.length || 0;

    // Make sure there are never more associations than there are
    // items to associate on either side
    const minAssociations = 0;
    const maxAssociations = Math.min(
      ...[Math.floor(Math.min(...[numRobots, numProjects]) / 2), 5]
    );

    // Create 2D arrays of associations
    const robotAssociations = dbRobots.map((robot, index) => {
      let randomIndexes = [];

      let randomNumberOfIndexes =
        Math.floor(Math.random() * (maxAssociations - minAssociations)) +
        minAssociations;

      for (let i = 0; i < randomNumberOfIndexes; i++) {
        let randomIndex = -1;
        while (
          randomIndex < 0 ||
          randomIndex >= numProjects ||
          randomIndexes.includes(randomIndex)
        ) {
          randomIndex = Math.floor(Math.random() * (numProjects - 1));
        }
        randomIndexes.push(randomIndex);
      }

      // Ensure our first element has multiple associations (test specs)
      while (index == 0 && randomIndexes.length < 2) {
        let randomIndex = -1;
        while (
          randomIndex < 0 ||
          randomIndex >= numProjects ||
          randomIndexes.includes(randomIndex)
        ) {
          randomIndex = Math.floor(Math.random() * (numProjects - 1));
        }
        randomIndexes.push(randomIndex);
      }

      return randomIndexes;
    });

    // Apply the associations by array Id
    await Promise.all(
      dbRobots.map((robot, robotIndex) => {
        return robot.addProjects(
          dbProjects.filter((project, projectIndex) =>
            robotAssociations[robotIndex].includes(projectIndex)
          )
        );
      })
    );
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
