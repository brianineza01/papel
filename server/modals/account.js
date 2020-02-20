import Joi from 'joi';
export const Account_schema = Joi.object().keys({
    date: Joi.date().required(),
    email: Joi.string().email().max(30).required(),
    type: Joi.string().alphanum().min(3).max(10).required(),
    status: Joi.string().alphanum().max(30).required(),
    balance: Joi.number().required()
}); 
