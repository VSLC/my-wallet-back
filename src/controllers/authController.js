import db from "../db.js"
import joi from 'joi'
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        const response = await db.collection("users").insertOne({ name, email, password: passwordHash });
        console.log(response);
        return res.sendStatus(202);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;


    try {

        const user = await db.collection('users').findOne({ 'email': email });
        const token = uuid();
        const userName = user.name
        const userInfo = {
            token,
            userName
        }

        if (user && bcrypt.compareSync(password, user.password)) {
            await db.collection('sessions').insertOne({
                userId: user._id,
                token,
            });
            delete user.password;

            return res.status(200).send(userInfo);

        } else {
            return res.status(400);
        }
    } catch (error) {
        return res.status(500);
    }
}

export { signUp, signIn }