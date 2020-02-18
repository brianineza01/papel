const express = require('express');
const {Client} = require('pg');
const connectionString = 'postgressql://postgres:123@localhost:6000/papel' ;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config();
const client = new Client(process.env.DB_CONNECT);

exports.usersignup =  async (req, resp) => {
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
     }
     try {
        client.connect()
        const hashedpassword = await bcrypt.hash(plainpassword, 10)
        client.query("INSERT INTO users(email , firstname , lastname , password , type , isadmin)  VALUES($1, $2 , $3 , $4 , $5 , $6)",
            [email, firstname, lastname, hashedpassword, type, isadmin], (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    showdata(email)
                    console("data perfectly inserted")
                }
            });
        } catch (error) {
            resp.status(500).send(error);
            console.log(error);  
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
}
