import Joi from 'joi';
export const Account_schema = Joi.object().keys({
    email: Joi.string().email().max(30).required(),
    type: Joi.string().alphanum().min(3).max(10).required(),
    status: Joi.string().alphanum().max(30).required(),
}); 
