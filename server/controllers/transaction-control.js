import client from '../database/db_connect';
import jwt from "jsonwebtoken";
//to credit an account
export const transactionCredit = async (req, resp) => {
    const type = 'credit';
    const number = Number(req.params.accountnumber)
    const amount = Number(req.body.amount);
    const decoded = jwt.decode(req.headers.token, process.env.JWT_KEY)
    const cashier = decoded.email;
    const date = new Date();
    try {
        const query = await client.query("SELECT balance FROM accounts where accountnumber = $1", [number]);
        const oldamount = query.rows[0].balance;
        let newamount = 0;
        newamount = oldamount + amount;
        await client.query("UPDATE accounts SET balance = $1 where accountnumber = $2", [newamount, number])
        const insert = await client.query(`INSERT INTO transactions
            (createdon , accountnumber , cashier , type , amount , oldbalance , newbalance)
             VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *` ,
            [date, number, cashier, type, amount, oldamount, newamount])
        resp.status(201).send({
            status: 201,
            data: insert.rows
        })
    } catch (err) {
        resp.status(400).send({
            status: 400,
            error: "bad request"
        })
    }
}

//debit an account
export const transactionDebit = async (req, resp) => {
    const type = 'Debit';
    const number = Number(req.params.accountnumber)
    const amount = Number(req.body.amount);
    const decoded = jwt.decode(req.headers.token, process.env.JWT_KEY)
    const cashier = decoded.email;
    const date = new Date();
    try {
        const query = await client.query("SELECT balance FROM accounts where accountnumber = $1", [number]);
        const oldamount = query.rows[0].balance;
        let newamount = 0;
        if (amount < oldamount) {
            newamount = oldamount - amount;
            await client.query("UPDATE accounts SET balance = $1 where accountnumber = $2", [newamount, number])
            const insert = await client.query(`INSERT INTO transactions
            (createdon , accountnumber , cashier , type , amount , oldbalance , newbalance)
             VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *` ,
                [date, number, cashier, type, amount, oldamount, newamount])
            resp.status(201).send({
                status: 201,
                data: insert.rows
            })
        } else {
            resp.status(400).send({
                status: 400,
                error: "can not debit an account of 0 amount"
            })
        }
    } catch (err) {
        resp.status(400).send({
            status: 400,
            error: "bad request"
        })
    }
}
//specific transaction
export const specificTransaction = async (req, resp) => {
    const { transactionid } = req.params;
    const id = Number(transactionid);
    try {
        const results = await client.query("select * from transactions where id = $1", [id])
        if (results.rowCount > 0) {
            resp.status(200).send({
                status: 200,
                data: results.rows
            });
        } else {
            resp.status(404).send({
                status: 404,
                error: "account number not found"
            })
        }
    }
    catch {
        resp.status(400).send({
            status: 400,
            error: "Bad request"
        })
    }
}
