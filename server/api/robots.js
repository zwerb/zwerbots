const router = require("express").Router();
const { Robot, Project } = require("../db");
const { promises: fs } = require("fs");
const path = require("path");

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

router.get("/images", async (req, res, next) => {
  try {
    // !REPLACE - Below Development Comment
    const images = await fs.readdir(
      path.join(__dirname, "../../public/images/robots")
    );
    res.json(images);
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

router.post("/", async (req, res, next) => {
  try {
    const robot = await Robot.create(req.body);
    res.status(201).json(robot);
  } catch (error) {
    next(error);
  }
});

router.delete("/:robotId", async (req, res, next) => {
  try {
    const response = await Robot.destroy({
      where: {
        id: req.params.robotId,
      },
    });

    const robot = response.data ? response.data : response;

    res.status(204).json(robot);
  } catch (error) {
    next(error);
  }
});

router.delete("/:robotId/:projectId", async (req, res, next) => {
  try {
    const projectToUnassign = await Project.findByPk(req.params.projectId);
    const robotToUpdate = await Robot.findByPk(req.params.robotId);

    const response = await robotToUpdate.removeProject(projectToUnassign);

    const responseMessage =
      response == 1
        ? `Successfully unassigned Project: [${req.params.projectId}] from Robot: [${req.params.robotId}].`
        : `Could not unassign Project: [${req.params.projectId}] from Robot: [${req.params.robotId}].`;
    const responseStatus = response == 1 ? 202 : 404;

    res.status(responseStatus).json(responseMessage);
  } catch (error) {
    next(error);
  }
});

router.put("/:robotId", async (req, res, next) => {
  try {
    const response = await Robot.update(req.body, {
      where: {
        id: req.params.robotId,
      },
      returning: true,
      plain: true,
    });

    const robot = response && response[1] ? response[1] : response;

    res.status(202).json(robot);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
