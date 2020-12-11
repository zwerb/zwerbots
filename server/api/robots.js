const router = require("express").Router();
const { Robot } = require("../db");

// GET /api/robots
router.get("/", async (req, res, next) => {
  try {
    // !REPLACE - Below Development Comment
    const robots = await Robot.findAll();
    res.json(robots);
  } catch (error) {
    next(error);
  }
});

router.get("/:robotId", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.robotId);
    res.json(robot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;