const http = require("http");
const port = 3000;
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type" : "text/html" });
        fs.readFile("../index.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: File not found");
            } else {
                res.write(data);
            }
            res.end();
        });
    }else if (req.url.match(/.css$/)) {
        let cssPath = path.join(path.resolve(__dirname, "../"), req.url); 
        let fileStream = fs.createReadStream(cssPath);
        res.writeHead(200, {"Content-Type" : "text/css"});
        fileStream.pipe(res);
    }else if (req.url.match(/.js$/)) {
        let jsPath = path.join(path.resolve(__dirname, "../"), req.url); 
        let fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, {"Content-Type" : "text/javascript"});
        fileStream.pipe(res);
    }
});


server.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong");
    } else {
        console.log("Server listening on port " + port);
    }
});
