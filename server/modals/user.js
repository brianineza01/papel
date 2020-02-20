import Joi from 'joi';
export const User_schema = Joi.object().keys({
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().max(30).required(),
    type: Joi.string().alphanum().min(3).max(10).required(),
    password: Joi.string().alphanum().min(6).max(30).required()
}); 
