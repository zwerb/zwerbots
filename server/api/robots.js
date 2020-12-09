const router = require("express").Router();

// !REPLACE - Below Development Comment
const { Robot } = require("../db");

// !REMOVE - Development Placeholder  
// const robots = [
//     { id: 1, name: 'R2-D2', imageUrl: '/images/r2d2.png' },
//     { id: 2, name: 'WALL-E', imageUrl: '/images/walle.jpeg' },
//   ];


// GET /api/albums
router.get("/", async (req, res, next) => {
  try {
    // !REPLACE - Below Development Comment
    const robots = await Robot.findAll();
    console.log('axios robots response: ',robots)
    res.json(robots);
  } catch (error) {
    next(error);
  }
});

module.exports = router;


