const express = require("express");
const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemByID,
  getAllProblems,
  solvedAllProblembyUser,
  submittedProblem,
} = require("../controllers/userProblem");
const userMiddleware = require("../middleware/userMiddleware");

console.log({
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemByID,
  getAllProblems,
});

// Create the Problem
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

problemRouter.get("/problemById/:id", userMiddleware, getProblemByID);
problemRouter.get("/getAllProblem", userMiddleware, getAllProblems);
// problemRouter.get(
//   "/problemSolvedByUser",
//   userMiddleware,
//   solvedAllProblembyUser,
// );
problemRouter.get(
  "/problemSolvedByUser",
  userMiddleware,
  solvedAllProblembyUser,
);

problemRouter.get("submittedProblem/:pid", userMiddleware, submittedProblem);

module.exports = problemRouter;
