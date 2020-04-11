
import bcrypt from 'bcrypt';
import client from '../database/db_connect';
import jwt from "jsonwebtoken";
client.connect()
export async function usersignup(req, resp) {
    const { lastname, firstname, email, type } = req.body
    let isadmin;
    if (type == 'admin') {
        isadmin = true
    } else {
        isadmin = false
    }
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10)
        client.query("INSERT INTO users(email , firstname , lastname , password , type , isadmin)  VALUES($1, $2 , $3 , $4 , $5 , $6) RETURNING id , firstname , lastname , type , email",
            [email, firstname, lastname, hashedpassword, type, isadmin],
            (err, result) => {
                resp.status(201).send({
                    status: 201,
                    data: result.rows
                })
            });
    } catch (error) {
        resp.status(500).send({
            status: 500,
            error: "internal server error"
        });
    }
}
//login a user
export const userlogin = async (req, resp) => {
    const { email } = req.body;
    try {
        client.query("SELECT * FROM USERS WHERE email = $1", [email], (err, results) => {
            if (results.rows.length >= 1) {
                checkpass(results);
            }
            else {
                resp.status(401).send({
                    status: 401,
                    error: "authentication failed"
                });
            }
        })
    } catch (error) {
        resp.status(401).send({
            status: 401,
            error: "authentication failed"
        });
    }
    const checkpass = async val => {
        const hashpassword = val.rows[0].password;
        const ans = await bcrypt.compare(req.body.password, hashpassword)
        if (ans) {
            const token = jwt.sign({
                email: val.rows[0].email,
                acc_type: val.rows[0].type
            }, process.env.JWT_KEY, { expiresIn: "2h" });
            resp.status(200).send({
                status: 200,
                data: [
                    {
                        token: token,
                        id: val.rows[0].id,
                        firstname: val.rows[0].firstname,
                        lastname: val.rows[0].lastname,
                        email: val.rows[0].email
                    }
                ]
            })
        } else {
            resp.status(401).send({
                status: 401,
                error: "authentication failed"
            })
        }
    };

}
