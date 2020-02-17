const express = require('express');

const {
    Client
} = require('pg');
const bcrypt = require('bcrypt');
const client = new Client({
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 6000,
    database: "papel"
});

const router = express.Router();

router.get('/', (req, resp) => {
    resp.send("auth route is working")
});

//create user account
router.post('/signup', async (req, resp) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const plainpassword = req.body.password;
    const type = req.body.type;
    let isadmin;
    if (type == 'admin') {
        isadmin = true
    } else {
        isadmin = false
    };

    try {

        client.connect();
        const hashedpassword = await bcrypt.hash(plainpassword, 10)
        console.log(hashedpassword);
        console.log(plainpassword);
        console.log(isadmin);

        client.query("INSERT INTO users(email , firstname , lastname , password , type , isadmin)  VALUES($1, $2 , $3 , $4 , $5 , $6)",
            [email, firstname, lastname, hashedpassword, type, isadmin], (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    showdata(email)
                }
            });

    } catch (error) {
        resp.status(500).send();
    }
    const showdata = value => {
        client.query("SELECT id , firstname , lastname ,email from users where email = $1", [value],
            (err, results) => {
                if (err) {
                    throw err;
                } else {
                    resp.send({
                        status: 200,
                        data: results.rows
                    })
                }
            })
    }
});
//login user
router.post('/login', (req, resp) => {
    resp.json({
        status: 201,
        data: {
            token: "45reced676754cewsvn76nn",
            id: 04,
            firstname: "kamali",
            Lastname: "herve",
            email: "kaherve@gmail.com"
        }
    })
});



module.exports = router;