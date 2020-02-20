import joi from 'joi';
import { User_schema } from "../modals/user";
export const validateUser = (req, res, next) => {
    const { error } = joi.validate(req.body, User_schema);
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
