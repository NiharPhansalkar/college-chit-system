const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { "Content-Type" : "text/html" }); // Gives a response header, which is used to give more detail about the response
        fs.readFile("../loginPage.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }else if (req.url == "/forgotPass.html"){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../forgotPass.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }else if (req.url == "/index.html"){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../forgotPass.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
        console.log(req.url);
    }else if (req.url.match(/.css$/)) {
        const cssPath = path.join(path.resolve(__dirname, "../"), req.url);
        let fileStream = fs.createReadStream(cssPath);
        res.writeHead(200, {"Content-Type" : "text/css"});
        fileStream.pipe(res);
    }else if (req.url.match(/.js$/)) {
        const jsPath = path.join(path.resolve(__dirname, "../"), req.url);
        let fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, {"Content-Type" : "text/javascript"});
        fileStream.pipe(res);
    }else if (req.url.match(/.png$/)) {
        const imgPath = path.join(path.resolve(__dirname, "../"), req.url);
        let fileStream = fs.createReadStream(imgPath);
        res.writeHead(200, {"Content-Type" : "image/png"});
        fileStream.pipe(res);
    }else if (req.url.match(/.jpg$/)) {
        const imgPath = path.join(path.resolve(__dirname, "../"), req.url);
        let fileStream = fs.createReadStream(imgPath);
        res.writeHead(200, {"Content-Type" : "image/jpg"});
        fileStream.pipe(res);
    }
});

server.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong");
    } else {
        console.log("Server listening on port " + port);
    }
})
