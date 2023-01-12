import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI,{useUnifiedTopology:true});

try {
    await mongoClient.connect();
    console.log("mongoDB conectado")
} catch (error) {
    console.log(error.message)
}
const db = mongoClient.db("db_mywallet")

export default db;