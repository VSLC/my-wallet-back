import { MongoClient } from "mongodb";
import cors from 'cors'
import express from 'express'
import joi from 'joi'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

const server = express();
const port = 5000;

server.use(cors());
server.use(express.json());

const mongoClient = new MongoClient("mongodb://localhost:27017");
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db("db_mywallet"); //O padrão é test
});

server.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        res.sendStatus(400);
        return;
    }
    try {
        const userSchema = joi.object({
            name: joi.string().required().min(1),
            email: joi.string().required().email(),
            password: joi.string().required().min(8),
            confirmPassword: joi.string().required().min(8)
        });
        const validation = userSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false });
        if (validation.error) {
            console.log(validation.error.details)
            res.sendStatus(404);
            return;
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        const response = await db.collection("users").insert({ name, email, password: passwordHash });
        console.log(response);
        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

server.post(('/'), async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').find({ email }).toArray();
        console.log(user);
        const token = uuid();
        if (user && bcrypt.compareSync(password, user.password)) {
            console.log("entrou no loop");
            await db.collection('sessions').insertOne({
                userId: user._id,
                token,
            });
            res.status(200).send(token);
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(500);
    }
})

server.post('/moneyin', async (req, res) => {
    const { value, description } = req.body;
    try {
        const moneyInSchema = joi.object({
            value: joi.number().required().min(1),
            description: joi.string().required().min(1),
            type: joi.string().valid('deposit', "withdraw")
        })
        const validation = moneyInSchema.validate({ value, description }, { abortEarly: false });
        if (validation.error) {
            res.sendStatus(500)
        }
        const validUser = await collection('sessions').findOne()
        await db.collection('inputs').insertOne({
            value, description, type: 'deposit'
        })
        res.sendStatus(202)
    } catch (error) {
        res.sendStatus(404)
    }

})

server.listen(port, () => { console.log(`listen on port ${port}`) });