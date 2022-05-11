// import express
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./routes/dishRouter"); // import the node module we made
// init localhost info
const hostname = "localhost";
const port = 3000;

// instantiate express server
const app = express();
app.use(morgan("dev")); // start use of morgan
// parse body of message in json format
app.use(bodyParser.json()); // start use of bodyParser, middleware

// // get information with dishId
// app.get("/dishes/:dishId", (req, res, next) => {
//   res.end("Will send details of the dish: " + req.params.dishId + " to you!");
// });

// // new dish with dishId
// app.post("/dishes/:dishId", (req, res, next) => {
//   res.end("POST operation not supported on /dishes/" + req.params.dishId);
// });

// // update dishes with dishId
// app.put("/dishes/:dishId", (req, res, next) => {
//   res.write("Updating the dish: " + req.params.dishId + "\n");
//   res.end(
//     "Will update the dish: " +
//       req.body.name +
//       " with details" +
//       req.body.description
//   );
// });

// // delete dishes with dishId
// app.delete("/dishes/:dishId", (req, res, next) => {
//   res.end("Deleting dishes: " + req.params.dishId);
// });

app.use("/dishes", dishRouter); // use the dishRouter for any endpoints of "/dishes"

// if the URL with filename path exists then go to it, else run the next app.use()
app.use(express.static(__dirname + "/public")); // start use of express static, __dirname is the current directory

// when server runs
app.use((req, res, next) => {
  //   if set up correctly
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<html><head><h1>This is an Express server</h1></head></html>");
});

// start server
const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
