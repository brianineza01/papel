import joi from 'joi';
import { Transaction_schema } from "../modals/transaction";
export const validateTransaction = (req, res, next) => {
    const data = {
        accountnumber : req.params.accountnumber ,
        amount : req.body.amount
    }
    const { error } = joi.validate(data,Transaction_schema);
    const valid = error == null;
    if (valid) {
        next();
    } else {
        const { details } = error;
        const message = details.map(i => i.message).join(',');
        res.status(400).json({
            status: 400,
            error: message
        })
    }
}
