const express = require('express');
const bodyParser = require("body-parser");

const cors = require("cors");

const db = require('./db');

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({ extend: true }));

let users = [
    {username:"Arm", email: "Arm@gmail", password: "1234"}
]
// Routing
app.get('/', (req, res)=> {
    res.send('<h1>Welcome to my home page.</h1>');
});

app.get('/item/:id', (req, res)=> {
    const id = req.params.id;
    res.send(`Received item id: ${id}`);
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    res.send(`Received email: ${email}, password: ${password}`);
});

app.post('/register', (req, res) => {
    const {full_name, email, password, confirm_password} = req.body;

    db.query("INSERT INTO account(a_name,a_email,a_pwd) VALUES(?,?,?)", [full_name,email,password], (err, result) => {
        if (err){
            res.status(500).json({ error: err.message});
        } else {
            res.redirect('/login');
        }
    });
});


//start server
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
