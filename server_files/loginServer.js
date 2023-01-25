const https = require("https"); // For creating HTTPS server
const fs = require("fs"); // To access the file system through which files will be loaded
const path = require("path"); // For functions like path.join and path.resolve
const querystring = require("querystring"); // For converting browser query string into an object
const nodemailer = require("nodemailer"); // To send emails to the user
const {Client} = require("pg"); // To connect to the postgres database
const url = require('url'); // For getting URL parameters
const port = 3000;

// Options for https server
const options = {
    host: "localhost",
    port: port,
    path: "/",
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    key: fs.readFileSync(path.join(path.resolve(__dirname, "../../"), "/certs/myLocalhost.key")),
    cert: fs.readFileSync(path.join(path.resolve(__dirname, "../../"), "/certs/myLocalhost.crt")),
    ca: fs.readFileSync(path.join(path.resolve(__dirname, "../../"), "/certs/myCA.pem")),
};

// Client connection for Postgres
const client = new Client({
    database: "information",
    port: 5432,
    user: "tigress",
    ssl: {
        rejectUnauthorized: false
    },
});

const server = https.createServer(options, (req, res) => {
    
    // For form submissions
    if (req.method.toLowerCase() === "post") {
        let body = '';
        req.on("data", (chunk) => {
            body += chunk.toString();
        })
        
        req.on("end", () => {
            // querystring.decode converts browser query string into an object
            const userInfo = querystring.decode(body); // userInfo is an object here

            // Status code 302 stands for code of redirection
            if (req.url === "/") {
                console.log(userInfo);
                res.writeHead(302, {"Location" : "/experiment_page/index.html"})
                res.end();
            }else if (req.url === "/forgot_password/forgotPass.html"){
                console.log(userInfo);
                res.writeHead(302, {"Location" : "/"})
                res.end();
            }else if (req.url === "/signup_page/signUp.html") {
                console.log(userInfo);

                // Generate OTP
                let userOTP = generateOTP();
                // Mail the OTP to the user
                sendOTP(userInfo, userOTP);
                
                client.connect();
                /*
                await client.query(`INSERT INTO faculty_information(email, password)
                VALUES ()`, (err, res) => {
                    if (err) throw err;
                    console.log(res.rows);
                });
                */

                res.writeHead(302, {"Location" : `/otp_page/otpPage.html?otp=${userOTP}&flag=1`})
                res.end();
            }else if (req.url.startsWith("/otp_page/otpPage.html")) {
                console.log(userInfo);

                const parsedURL = url.parse(req.url, true); // parse the URL and include the query string
                const query = parsedURL.query; // Get the query string object

                if (userInfo["user-otp"] == query.otp) {
                    res.writeHead(302, {"Location" : "/"})
                    res.end();
                } else {
                    res.writeHead(302, {"Location" : `/otp_page/otpPage.html?otp=${query.otp}&flag=-1`})
                    res.end();
                }
            }
        });
    }

    // Following is how the server decides which file to load
    // All paths are relative to root of the project
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
    }else if (req.url == "/signup_page/signUp.html"){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../signup_page/signUp.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }else if (req.url.startsWith("/otp_page/otpPage.html")){
        res.writeHead(200, {"Content-Type" : "text/html" });
        fs.readFile("../otp_page/otpPage.html", (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write("Error: Page not found");
            }else {
                res.end(data);
            }
        });
    }
    // The match function tries to match with provided regexp.
    // Here the regexp is matching with file extensions at the end
    else if (req.url.match(/.css$/)) {
        // path.resole: Firstly, path.resolve takes / to be the root unlike path.join.
        // path.resolve always gives absolute path with base of working directory being root
        // https://www.youtube.com/watch?v=LaNuN3FkcM8 - Difference between join and resolve
        const cssPath = path.join(path.resolve(__dirname, "../"), req.url);
        let fileStream = fs.createReadStream(cssPath); // Create a readstream to read file
        res.writeHead(200, {"Content-Type" : "text/css"});
        fileStream.pipe(res); // pipe helps us directly write without needing a write stream
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

/* Start of functions utility functions */

function signUpCheck(userObject) {
    if ("confirm-user-password" in userObject) {
        if (userObject["user-password"] !== userObject["confirm-user-password"]) {
            throw new Error("Password entered does not match with confirm password field");
        }
    }
    if (!userObject["user-email"].match(/@sitpune.edu.in$/)){
        throw new Error("Invalid email, please enter again!");
    }
}

async function sendOTP(userObject, userOTP) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: "digichit1@gmail.com",
            pass: "hdgqqmmxnnibyavd",
            // pass: "digichit#123"
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    let info = await transporter.sendMail({
        from: 'DigiChit <digichit1@gmail.com>',
        to: `${userObject["user-email"]}`,
        subject: "Email Confirmation",
        html: `<p>Hello! Below is the OTP for your email confirmation! Thank you for using DigiChit!</p>
            <h2>${userOTP}</h2>`
    })
}

function generateOTP() {
    const min = 1000000;
    return Math.floor(Math.random() * min);
}
