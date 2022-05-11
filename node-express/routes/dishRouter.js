const express = require("express"); // import express (includes mini-express)
const bodyParser = require("body-parser"); // import body-parser

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// all in one group
dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next(); // continue to look for the next middleware with /dishes
  })
  .get((req, res, next) => {
    res.end("Will send all the dishes to you!");
  })
  .post((req, res, next) => {
    res.end(
      "Will add the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    res.end("Deleting all dishes");
  });

module.exports = dishRouter;
