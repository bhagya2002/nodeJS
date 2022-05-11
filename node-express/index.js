// import express
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./routes/dishRouter"); // import the node module we made
const promotionRouter = require("./routes/promotionRouter"); // import the node module we made
const leaderRouter = require("./routes/leaderRouter"); // import the node module we made

// init localhost info
const hostname = "localhost";
const port = 3000;

// instantiate express server
const app = express();
app.use(morgan("dev")); // start use of morgan
// parse body of message in json format
app.use(bodyParser.json()); // start use of bodyParser, middleware

// USING ROUTES was switched to external files
app.use("/dishes", dishRouter); // use the dishRouter for any endpoints of "/dishes"
app.use("/dishes/:dishId", dishRouter); // use the dishRouter for any endpoints of "/dishes/:dishId"

app.use("/promotions", promotionRouter); // use the promotionRouter for any endpoints of "/promotions"
app.use("/promotions/:promoId", promotionRouter); // use the promotionRouter for any endpoints of "/promotions/:promotionId"

app.use("/leaders", leaderRouter); // use the leaderRouter for any endpoints of "/leaders"
app.use("/leaders/:leaderId", leaderRouter); // use the leaderRouter for any endpoints of "/leaders/:leaderId"

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
