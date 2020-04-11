import joi from 'joi';
import { Account_schema } from "../modals/account";
export const validateAccount = (req, res, next) => {
    const { error } = joi.validate(req.body, Account_schema);
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
