const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const port = 3000;

const server = http.createServer((req, res) => {
    
    // For form submissions
    if (req.method.toLowerCase() === "post") {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk.toString();
        })
        req.on("end", () => {
            console.log(querystring.decode(body));
            if (req.url === "/") {
                res.writeHead(302, {"Location" : "/experiment_page/index.html"})
                res.end();
            }else {
                res.writeHead(302, {"Location" : "/"})
                res.end();
            }
        });
    }

    if (req.url == "/") {
        res.writeHead(200, { "Content-Type" : "text/html" }); // Gives a response header, which is used to give more detail about the response
        fs.readFile("../login_page/loginPage.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }else if (req.url == "/forgot_password/forgotPass.html"){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../forgot_password/forgotPass.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }else if (req.url == "/experiment_page/index.html"){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../experiment_page/index.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }else if (req.url == "/signUp.html"){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../signup_page/signUp.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
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
