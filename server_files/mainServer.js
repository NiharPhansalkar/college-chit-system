const https = require("https");
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require("fs"); // To access the file system through which files will be loaded
const path = require("path"); // For functions like path.join and path.resolve
const nodemailer = require("nodemailer"); // To send emails to the user
const { Pool } = require("pg"); // To connect to the postgres database
const url = require("url"); // For getting URL parameters
const port = 3000;

// creates an instance of express application
const app = express();

// Options for https server
const options = {
    host: "localhost",
    port: port,
    path: "/",
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    key: fs.readFileSync(
        path.join(path.resolve(__dirname, "../../"), "/certs/myLocalhost.key")
    ),
    cert: fs.readFileSync(
        path.join(path.resolve(__dirname, "../../"), "/certs/myLocalhost.crt")
    ),
    ca: fs.readFileSync(
        path.join(path.resolve(__dirname, "../../"), "/certs/myCA.pem")
    ),
};

// Middleware function to serve static files such as HTML, CSS, JS and Images
app.use(express.static(path.resolve(__dirname, "../")));

// used to define a route for the HTTP GET method
app.get('/', (req, res) => {
    res.redirect("/login_page/loginPage.html");
})

app.get('/login_page/loginPage.html', (req, res) => {
   res.sendFile(path.join(path.resolve(__dirname, "../"), "/login_page/loginPage.html")); 
});

app.get('/forgot_password/forgotPass.html', (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, "../"), "/forgot_password/forgotPass.html"));
});

app.get('/experiment_page/index.html', (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, "../"), "/experiment_page/index.html"));
});

app.get('/signup_page/signUp.html', (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, "../"), "/signup_page/signUp.html"));
});

app.get('/otp_page/otpPage.html', (req, res) => {
    res.sendFile(path.join(path.resolve(__dirname, "../"), "/otp_page/otpPage.html"));
});

/*
    * Starting post request handling
*/

app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());

app.use(session({
    secret: "otp-secret",
    resave: false,
    saveUninitialized: true
}));

app.post('/forgot_password/forgotPass.html', (req, res) => {
    res.redirect('/login_page/loginPage.html');
});

app.post('/signup_page/signUp.html', async(req, res) => {
    try {
        // Generate OTP
        let userOTP = generateOTP();
        // Mail the OTP to the user
        sendOTP(req.body["user-email"], userOTP);

        // Creating query to insert email, password, etc into the database
        let dbQuery = `
        INSERT INTO faculty_information(email, password)
        VALUES (
            '${req.body["user-email"]}', 
            '${req.body["user-password"]}'
        );`;

        const pool = createPool();

        const dbres = await pool.query(dbQuery)

        req.session.userOTP = userOTP;

        res.redirect('/otp_page/otpPage.html');
    } catch (err) {
        console.log(err);
    }
});

app.post('/forgot_password/forgotPass.html', (req, res) => {
    res.redirect('/');    
});

app.post('/otp_page/otpPage.html', (req, res) => {
    const userOTP = req.session.userOTP;

    if (req.body['user-otp'] == userOTP) {
        delete req.session.userOTP;
        res.redirect('/');
    } else {
        res.redirect('/otp_page/otpPage.html?flag=-1');
    }
});

app.post('/login_page/loginPage.html', async(req, res) => {
    const pool = createPool();

    // Below is the query to get user password
    let dbQuery = `
        SELECT password FROM faculty_information
        WHERE email='${req.body["user-email"]}';
    `;

    try {
        const dbres = await pool.query(dbQuery);

        if (dbres.rows.length !== 0) {
            if (dbres.rows[0].password === "") {
                // Empty password not possible

                res.redirect('/login_page/loginPage.html?error=-1');
            } else if (req.body['user-password'] === dbres.rows[0].password) {
                // Correct password

                res.redirect('/experiment_page/index.html');
            } else {
                // Incorrect password
                
                res.redirect('/login_page/loginPage.html?error=-2');
            }
        } else {
            // Not signed up

            res.redirect('/login_page/loginPage.html/error=-3');
        }
    } catch (err) {
        console.log(err);
    }
});

const server = https.createServer(options, app);
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

function signUpCheck(userObject) {
    if ("confirm-user-password" in userObject) {
        if (
            userObject["user-password"] !== userObject["confirm-user-password"]
        ) {
            throw new Error(
                "Password entered does not match with confirm password field"
            );
        }
    }
    if (!userObject["user-email"].match(/@sitpune.edu.in$/)) {
        throw new Error("Invalid email, please enter again!");
    }
}

async function sendOTP(userMail, userOTP) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: "digichit1@gmail.com",
            pass: "iaixrqyjqxrzdyyr",
            // pass: "digichit#123"
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let info = await transporter.sendMail({
        from: "DigiChit <digichit1@gmail.com>",
        to: `${userMail}`,
        subject: "Email Confirmation",
        html: `<p>Hello! Below is the OTP for your email confirmation! Thank you for using DigiChit!</p>
            <h2>${userOTP}</h2>`,
    });
}

function generateOTP() {
    const min = 1000000;
    return Math.floor(Math.random() * min);
}

function createPool() {
    return new Pool({
        database: "information",
        port: 5432,
        user: "tigress",
        ssl: {
            rejectUnauthorized: false,
            key: fs
                .readFileSync(
                    path.join(
                        path.resolve(__dirname, "../../"),
                        "/certs/myLocalhost.key"
                    )
                )
                .toString(),
            cert: fs
                .readFileSync(
                    path.join(
                        path.resolve(__dirname, "../../"),
                        "/certs/myLocalhost.crt"
                    )
                )
                .toString(),
            ca: fs
                .readFileSync(
                    path.join(
                        path.resolve(__dirname, "../../"),
                        "/certs/myCA.pem"
                    )
                )
                .toString(),
        },
    });
}
