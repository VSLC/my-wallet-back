import cors from 'cors';
import express from 'express';
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
const server = express();
const port = 5000;


server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(userRouter);

server.listen(port, () => { console.log(`listen on port ${port}`) });