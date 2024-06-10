import Joi from 'joi';

export const debtvalid = async (body) => {

    const debtSchema = Joi.object({
        amount: Joi.number().required(),
        description: Joi.string().max(255).required(),
        due_date: Joi.string().isoDate().required(),
        status: Joi.string().max(10).min(3).required()
    });

    const { error, value } = debtSchema.validate(body);

    if(error){
        throw error;
    };
    return value;
}