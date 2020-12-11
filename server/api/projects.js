const router = require("express").Router();

// !REPLACE - Below Development Comment
const { Project, Robot } = require("../db");

// GET /api/projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId", async (req, res, next) => {
  try {
    const projectResponse = await Project.findAll({
      where: {
        id: req.params.projectId,
      },
      include: {
        model: Robot,
      },
    });

// !REMOVE
// router.get("/:projectId", async (req, res, next) => {
//   try {
//     let project = await Project.findAll({
//       where: {
//         id: req.params.projectId,
//       },
//       include: {
//         model: Robot,
//       },
//     });

//     const additional_robots_response = await Robot.findAll({
//       include: {
//         model: Project,
//         where: {
//           id: req.params.projectId,
//         },
//       },
//     });

//     const additional_robots = additional_robots_response.map((robot) => {
//       const { id, name, imageUrl } = robot;
//       return {id, name, imageUrl };
//     });

//     let finalProject = project[0];
//     finalProject.assignees = additional_robots;

const project = projectResponse[0]

    res.json(project);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
