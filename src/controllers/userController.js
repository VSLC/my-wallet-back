import db from "../db.js"

const moneyIn = async (req, res) => {
    const { value, description, currentDay, type } = req.body;
    try {

        await db.collection('moneyBalance').insertOne({
            userId: res.locals.user._id, value, description, currentDay, type
        })

        return res.sendStatus(202);
    } catch (error) {
        return res.sendStatus(404);
    }

}

const moneyOut = async (req, res) => {
    const { value, description, currentDay, type } = req.body;


    try {

        await db.collection('moneyBalance').insertOne({
            userId: res.locals.user._id, value, description, currentDay, type
        })

        return res.sendStatus(202);
    } catch (error) {
        return res.sendStatus(404);
    }

}

const listBalance = async (req, res) => {

    try {
        const moneyBalance = await db.collection('moneyBalance').find({ userId: res.locals.user._id }).toArray();
        console.log(moneyBalance);

        return res.send(moneyBalance).status(201);
    } catch (error) {
        return res.sendStatus(501)
    }
}

export { moneyIn, moneyOut, listBalance }