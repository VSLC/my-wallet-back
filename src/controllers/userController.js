import db from "../db.js"
import joi from 'joi';

const moneyIn = async (req, res) => {
    const { value, description, currentDay, type } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        const moneyInSchema = joi.object({
            value: joi.number().required().min(1),
            description: joi.string().required().min(1),
            type: joi.string().valid('deposit', 'withdraw')
        })

        const validation = moneyInSchema.validate({ value, description, type }, { abortEarly: false });
        if (validation.error) {
            res.sendStatus(422);
        }
        console.log("Validou")

        const sessions = await db.collection('sessions').findOne({ token })
        if (!sessions) {
            res.sendStatus(401);
            return;
        }

        console.log("validou sessions")

        const user = await db.collection('users').findOne({
            _id: sessions.userId
        })


        await db.collection('moneyBalance').insertOne({
            userId: user._id, value, description, currentDay, type
        })

        res.sendStatus(202);
    } catch (error) {
        res.sendStatus(404);
    }

}

const moneyOut = async (req, res) => {
    const { value, description, currentDay, type } = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
        const moneyInSchema = joi.object({
            value: joi.number().required().min(1),
            description: joi.string().required().min(1),
            type: joi.string().valid('deposit', 'withdraw')
        })

        const validation = moneyInSchema.validate({ value, description, type }, { abortEarly: false });
        if (validation.error) {
            res.sendStatus(422)
        }
        console.log("Validou")

        const sessions = await db.collection('sessions').findOne({ token })
        if (!sessions) {
            res.sendStatus(401);
            return;
        }

        console.log("validou sessions")

        const user = await db.collection('users').findOne({
            _id: sessions.userId
        })

        console.log(user);

        await db.collection('moneyBalance').insertOne({
            userId: user._id, value, description, currentDay, type
        })

        res.sendStatus(202);
    } catch (error) {
        res.sendStatus(404);
    }

}

const listBalance = async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    try {
        const sessions = await db.collection('sessions').findOne({ token });

        if (!sessions) {
            res.sendStatus(401);
        }

        const user = await db.collection('users').findOne({
            _id: sessions.userId
        })

        const moneyBalance = await db.collection('moneyBalance').find({ userId: user._id }).toArray();
        console.log(moneyBalance);

        res.send(moneyBalance).status(201);
    } catch (error) {
        res.sendStatus(501)
    }
}

export { moneyIn, moneyOut, listBalance }