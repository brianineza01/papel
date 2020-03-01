import client from '../database/db_connect';
//list of accounts
export const listofaccounts = async (req, resp) =>{
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

export  const createAccount = async (req, resp) => {
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
            status: 500,
            error: "internal server error"
        })
    }
}
//specific account 
export const specificinfo = async (req, resp) => {
    const accountnumber = req.params.accountnumber;
    const number = Number(accountnumber);
    try {
        client.query("select * from accounts where accountnumber = $1", [number]
            , (err, results) => {
                if (err) {
                    resp.status(400).send({
                        status: 400,
                        error: "bad request"
                    })
                } else {
                    if (results.rows.length == 1) {
                        resp.send({
                            status: 200,
                            data: results.rows
                        })
                    } else {
                        resp.status(404).send({
                            status: 404,
                            error: 'data are not found'
                        })
                    }
                }
            })
    } catch (error) {
        resp.status(500).send({
            status: 500,
            error: "internal server error"
        })
    }
}
//deleting an account
export const Deleteaccount = async (req, resp) => {
    const accountnumber = req.params.accountnumber;
    const number = Number(accountnumber);
    try {
        client.query("delete from accounts where accountnumber = $1", [number],
            (err, results) => {
                if (err) {
                    resp.status(400).send({
                        status: 400,
                        error: "bad request"
                    })
                } else {
                    resp.send({
                        status: 200,
                        message: "account was succesfully deleted"
                    })
                }

            })
    }
    catch (err) {
        resp.send({
            status: 500,
            error: "internal server error"
        })
    }
}
//an account's transaction history
export const historyofaccounts = async (req, resp) => {
    const { accountnumber } = req.params;
    const number = Number(accountnumber);
    try {
        const results = await client.query("select * from transactions where accountnumber = $1", [number]);
        if (results.rowCount > 0) {
            resp.send({
                status: 200,
                data: results.rows
            });
        } else {
            resp.status(404).send({
                status: 404,
                error: "account number not found"
            })
        }
    } catch (error) {
        resp.status(400).send({
            status: 400,
            error: "Bad request"
        });
    }
}
//changing bank account status
export const changeStatus = async (req, resp) => {
    const accountnumber = req.params.accountnumber;
    const number = Number(accountnumber);
    try {
        client.query("select status from accounts where accountnumber = $1",
            [number], (err, rows) => {
                if (err) {
                    resp.status(400).send({
                        status : 400,
                        error : "bad request"
                    })
                } else {
                    usedata(rows)
                }
            });
        const usedata = value => {
            if (value.rows[0] == undefined) {
                resp.status(404).send({
                    status : 404 ,
                    error : "account number not found"
                })
            } else {
            const status = value.rows[0].status;
            if (status == 'active') {
                client.query("UPDATE accounts set status = 'dormant' where accountnumber = $1", [number])
                client.query("SELECT accountnumber , status from accounts where accountnumber = $1", [number],
                    (err, rows) => {
                        resp.send({
                            status: 200,
                            data: rows.rows
                        })                
                    })
            } else if (status == 'dormant') {
                client.query("UPDATE accounts set status = 'active' where accountnumber = $1", [number])
                client.query("SELECT accountnumber , status from accounts where accountnumber = $1", [number],
                    (err, rows) => {
                        if (err) {
                            throw err;
                        } else {
                            resp.send({
                                status: 200,
                                data: rows.rows
                            })
                        }
                    })
            } else {
                resp.status(500).send({
                    status : 500,
                    error : "internal server error"
                })
            }
        }
    }
    } catch (error) {
        resp.status(500).send({
            status: 500,
            error: "internal server error"
        })
    }
}
