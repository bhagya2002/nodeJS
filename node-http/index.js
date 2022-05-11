const http = require("http"); // init the server
const fd = require("fs"); // init the file system core module
const path = require("path"); // init the path core module, read/write files

// where the server will listen, post 3000 of localhost
const hostname = "localhost";
const port = 3000;

// make the server with req (request) and res (response)
const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + " by method " + req.method); // get, post, put, delete, etc.

  //   only if the method is a GET
  if (req.method === "GET") {
    //   get the URL from the server
    var fileUrl;
    if (req.url == "/") fileUrl = "/index.html"; // default to /index.html
    else fileUrl = req.url; // else get the file path

    //  get the file path from the public folder
    var filePath = path.resolve("./public" + fileUrl);
    const fileExt = path.extname(filePath); // get the file extension of the file

    // if the file is an HTML file then search if its in the directory
    if (fileExt === ".html") {
      fd.exists(filePath, (exists) => {
        //   if the file does not exisit
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>Error 404: " +
              fileUrl +
              " not found</h1></body></html>"
          );
          return;
        }
        // if the file exists
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fd.createReadStream(filePath).pipe(res);
      });
    } else {
      // if the file is not an HTML file
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a HTML file</h1></body></html>"
      );
      return;
    }
  } else {
    // if the method is not a GET
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404: " +
        req.method +
        " not supported</h1></body></html>"
    );
    return;
  }
});

// start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
