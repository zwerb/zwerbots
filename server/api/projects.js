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
    const project = await Project.findAll({
      where: {
        id: req.params.projectId,
      },
      include: {
        model: Robot,
      },
    });
    res.json(project[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;