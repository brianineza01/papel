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
            (err , rows) =>{
                    resp.send({
                        status: 200 ,
                        data: rows.rows
                    })
                })
        } else if(status == undefined) {
            client.query("SELECT * from accounts ",
                (err, results) => {
                    resp.send({
                        status: 200,
                        data: results.rows
                    })
                })
        } else {
            resp.status(400).send({
                status : 400 ,
                error : "bad request"
            })
        }
    } catch (error) {
        resp.status(500).send({
            status : 500 ,
            error : "internal server error"
        })
    }
}
