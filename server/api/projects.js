const router = require("express").Router();

// !REPLACE - Below Development Comment
const { Project } = require("../db");

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
    const project = await Project.findByPk(req.params.projectId);
    res.json(project);
  } catch (error) {
    next(error);
  }
});

module.exports = router;