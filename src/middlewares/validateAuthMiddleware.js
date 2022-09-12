import joi from 'joi'

const validateUserSignIn = (req, res, next) => {
    const { email, password } = req.body;

    const userSchema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(8)
    });
    const validation = userSchema.validate({ email, password }, { abortEarly: false });

    if (validation.error) {
        res.sendStatus(422);
        return;
    }

    next();

}

const validateUserSignUp = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    

    const userSchema = joi.object({
        name: joi.string().required().min(1),
        email: joi.string().required().email(),
        password: joi.string().required().min(8),
        confirmPassword: joi.ref("password")
    });
    const validation = userSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });
    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422);
        return;
    }
    next();
}

export { validateUserSignUp, validateUserSignIn }