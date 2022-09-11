import joi from "joi"
import db from "../db.js"

const validateMoney = (req, res, next) => {
    const { value, description, currentDay, type } = req.body;

    const moneyInSchema = joi.object({
        value: joi.number().required().min(1),
        description: joi.string().required().min(1),
        type: joi.string().valid('deposit', 'withdraw')
    })

    const validation = moneyInSchema.validate({ value, description, type }, { abortEarly: false });
    if (validation.error) {
        res.sendStatus(422);
    }
    next();
}

const validateToken = async (req, res, next) => {

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        res.sendStatus(401)
    }
    const sessions = await db.collection('sessions').findOne({ token })

    if (!sessions) {
        res.sendStatus(401);
        return;
    }

    console.log("validou sessions")

    const user = await db.collection('users').findOne({
        _id: sessions.userId
    })

    if (!user) {
        res.sendStatus(401);
    }

    res.locals.user = user;

    next();
}

export { validateMoney, validateToken }