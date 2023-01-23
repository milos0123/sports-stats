import Joi from 'joi'
import ExpressError from "./utils/expressError";


const registerSchema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(20).required(),
    repeatPassword: Joi.ref('password'),
});

const loginUserSchema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(20).required(),
});

export const validateRegisterForm = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        // console.log('validateRegister', error)
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

export const validateLoginForm = (req, res, next) => {
    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        // console.log('validateLogin', error)
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
