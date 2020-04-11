import client from '../database/db_connect';
//retrieve all accounts owned by one user
export const listAccountOwner = async (req, resp) => {
    const { email } = req.params;
    try {
        const results = await client.query("select createdon,accountnumber,type,status,balance from accounts where owneremail = $1",
            [email]);
        if (results.rowCount > 0) {
            resp.status(200).send({
                status: 200,
                data: results.rows
            })
        } else {
            resp.status(404).send({
                status: 404,
                error: "account not found"
            })
        }
    } catch (error) {
        resp.status(404).send({
            status : 400,
            error : "Bad request"
        })
    }

}