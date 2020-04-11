import joi from 'joi';
import { Usersignup_schema , Userlogin_schema , UserRetrieve_schema} from "../modals/user";
export const validateUsersignup = (req, res, next) => {
    const { error } = joi.validate(req.body, Usersignup_schema);
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
export const validateUserlogin = (req, res, next) => {
    const { error } = joi.validate(req.body, Userlogin_schema);
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
export const validateUseremail = (req, res, next) => {
    const { error } = joi.validate(req.params, UserRetrieve_schema);
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
