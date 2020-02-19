
import { hash } from 'bcrypt';
import client from '../database/db_connect';
client.connect();
export async function usersignup(req, resp) {
    const { lastname, firstname, email, type } = req.body
    let isadmin;
    if (type == 'admin') {
        isadmin = true
    } else {
        isadmin = false
    }
    try {
        const hashedpassword = await hash(req.body.password, 10)
        client.query("INSERT INTO users(email , firstname , lastname , password , type , isadmin)  VALUES($1, $2 , $3 , $4 , $5 , $6) RETURNING id , firstname , lastname , type",
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
