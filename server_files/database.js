const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "tigress",
    host: "localhost",
    database: "information",
    password: "",
    port: 3000,
});

pool.query("table faculty_information", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
    }
    pool.end();
})
