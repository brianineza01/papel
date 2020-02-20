import client from '../database/db_connect';
//list of accounts
export async function listofaccounts(req, resp) {
    const status = req.query.status;
    try {
        if (status == 'active') {
            client.query("SELECT * from accounts where status = $1", [status], (err, rows) => {
                resp.send({
                    status: 200,
                    data: rows.rows
                });
            })
        } else if (status == 'dormant') {
            client.query("SELECT * from accounts where status = $1", [status],
                (err, rows) => {
                    resp.send({
                        status: 200,
                        data: rows.rows
                    })
                })
        } else if (status == undefined) {
            client.query("SELECT * from accounts ",
                (err, results) => {
                    resp.send({
                        status: 200,
                        data: results.rows
                    })
                })
        } else {
            resp.status(400).send({
                status: 400,
                error: "bad request"
            })
        }
    } catch (error) {
        resp.status(500).send({
            status: 500,
            error: "internal server error"
        })
    }
}


//create a bank account

export async function createAccount(req, resp) {
    const { date, email, type, status, balance } = req.body
    try {
        client.query("INSERT INTO accounts(createdon , owneremail ,  type , status ,balance)  VALUES($1, $2 , $3 , $4 , $5) RETURNING *",
            [date, email, type, status, balance],
            (err, result) => {
                resp.status(201).send({
                    status: 201,
                    data: result.rows
                })
            });
    } catch (error) {
        resp.status(500).send({
            status : 500,
            error : "internal server error"
        })
    }
}
