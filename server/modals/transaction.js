import Joi from 'joi';
export const Transaction_schema = Joi.object().keys({
    accountnumber: Joi.number().required(),
    amount: Joi.number().required()
}); 
