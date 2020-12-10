const router = require("express").Router();

// !REPLACE - Below Development Comment
const { Project } = require("../db");

// GET /api/albums
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

module.exports = router;