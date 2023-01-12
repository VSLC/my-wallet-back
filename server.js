import cors from 'cors';
import express from 'express';
import authRouter from "./src/routes/authRouter.js"
import userRouter from "./src/routes/userRouter.js"
const server = express();
const port = 5000;


server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(userRouter);

server.listen(port, () => { console.log(`listen on port ${port}`) });