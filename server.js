const express = require("express");
// const sql = require("mysql2");
// const table = require("console.table");
// const inquirer = require("inquirer");

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.get("/", (req, res) => console.log(res))
// const db = sql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'business_db'
//     }
// )

app.listen(PORT, () =>{
    console.log(`LIVE SERVER: ${PORT}`)
})