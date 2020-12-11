const router = require("express").Router();
const { Robot, Project } = require("../db");

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
    const robot = await Robot.findAll({
      where: {
        id: req.params.robotId,
      },
      include: {
        model: Project,
      },
    });
    res.json(robot[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
