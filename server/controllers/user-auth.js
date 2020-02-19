
import { hash } from 'bcrypt';
import client from '../database/db_connect';

export async function usersignup(req, resp) {
    const {lastname , firstname , email , type} = {
        lastname : req.body.lastname,
        firstname : req.body.firstname,
        email : req.body.email,
        type : req.body.type
    }
     let isadmin;
     if (type == 'admin') {
         isadmin = true
     } else {
         isadmin = false
     }
     try {
        client.connect()
        const hashedpassword = await hash(req.body.password, 10)
        client.query("INSERT INTO users(email , firstname , lastname , password , type , isadmin)  VALUES($1, $2 , $3 , $4 , $5 , $6)",
            [email, firstname, lastname, hashedpassword, type, isadmin], (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    showdata(email);
                    console.log("data perfectly inserted");
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
                    resp.status(201).send({
                        status: 201,
                        data: results.rows
                })
            }
        })
    }
}
