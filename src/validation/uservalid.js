import Joi from 'joi';

export const userValid = async (body, type) => {

    const validSchema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        role: Joi.string()
    });

    const validSchema2 = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3),
    });

    if(type == 'register'){
        const { error, value } = validSchema.validate(body);

        if(error) throw error;
        return value;

    } else if(type == 'login'){
        const { error, value } = validSchema2.validate(body);

        if(error) throw error;
        return value;
        
    } else {
        throw new Error("Validatsiya type noto'g'ri");
    }

}

