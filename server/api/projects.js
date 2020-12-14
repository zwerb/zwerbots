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

    const project = projectResponse[0];

    res.json(project);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

router.delete("/:projectId", async (req, res, next) => {
  try {
    const response = await Project.destroy({
      where: {
        id: req.params.projectId,
      },
    });
    console.log("delete repsonse: ", response);

    const project = response.data ? response.data : response;

    res.status(204).json(project);
  } catch (error) {
    next(error);
  }
});

router.delete("/:projectId/:robotId", async (req, res, next) => {
  try {

    const robotToUnassign = await Robot.findByPk(req.params.robotId);
    const projectToUpdate = await Project.findByPk(req.params.projectId);

    const response = await projectToUpdate.removeRobot(robotToUnassign);

    const responseMessage =
      response == 1
        ? `Successfully unassigned Robot: [${req.params.robotId}] from Project: [${req.params.projectId}].`
        : `Could not unassign Robot: [${req.params.robotId}] from Project: [${req.params.projectId}].`;
    const responseStatus = response == 1 ? 202 : 404;

    res.status(responseStatus).json(responseMessage);
  } catch (error) {
    next(error);
  }
});

router.put("/:projectId", async (req, res, next) => {
  try {
    console.log("update api req body: ", req.body);

    const response = await Project.update(req.body, {
      where: {
        id: req.params.projectId,
      },
      returning: true,
      plain: true,
    });

    console.log("update api repsonse: ", response);

    const project =
      response&& response[1] ? response[1] : response;

      console.log("update api project: ", project);

    res.status(202).json(project);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
