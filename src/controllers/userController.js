import db from "../db.js"
import joi from 'joi';

const moneyIn = async (req, res) => {
    const { value, description, currentDay, type } = req.body;
    try {

        console.log(await db.collection('moneyBalance').insertOne({
            userId: res.locals.user._id, value, description, currentDay, type
        }))

        res.sendStatus(202);
    } catch (error) {
        res.sendStatus(404);
    }

}

const moneyOut = async (req, res) => {
    const { value, description, currentDay, type } = req.body;


    try {

        await db.collection('moneyBalance').insertOne({
            userId: res.locals.user._id, value, description, currentDay, type
        })

        res.sendStatus(202);
    } catch (error) {
        res.sendStatus(404);
    }

}

const listBalance = async (req, res) => {

    try {
        const moneyBalance = await db.collection('moneyBalance').find({ userId: res.locals.user._id }).toArray();
        console.log(moneyBalance);

        res.send(moneyBalance).status(201);
    } catch (error) {
        res.sendStatus(501)
    }
}

export { moneyIn, moneyOut, listBalance }